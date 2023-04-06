import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from '@mui/material/styles';
import { DANGER_COLOR, Ticket, QueryKeys } from '../../utilities';
import Spinner from '../loader';
import { useHandleError, useAlert } from '../../hooks';
import { closeTicket } from '../../api';

interface Props {
	ticket: Ticket;
}

const CloseDispute = ({ ticket }: Props) => {
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const alert = useAlert();

	const { isLoading, mutate } = useMutation(closeTicket, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					alert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				queryClient.invalidateQueries(QueryKeys.Ticket);
				queryClient.invalidateQueries(ticket.id);
				alert({ message: data.message, type: 'success' });
			}
		},
	});

	const data = {
		status: 'CLOSED',
	};

	return (
		<>
			{isLoading && <Spinner />}
			<Button
				onClick={() =>
					mutate({
						id: ticket.id,
						data,
					})
				}
			>
				Close Dispute
			</Button>
		</>
	);
};

const Button = styled(MuiButton)(({ theme }) => ({
	backgroundColor: `${DANGER_COLOR} !important`,
	color: grey['50'],
	paddingLeft: '20px',
	paddingRight: '20px',
	borderRadius: '30px',
}));

export default CloseDispute;
