import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from '@mui/material/styles';
import { Ticket, QueryKeys } from '../../utilities';
import { useHandleError, useAlert } from '../../hooks';
import { resolveTicket } from '../../api';
import AppButton from '.';

interface Props {
	ticket: Ticket;
}

const ResolveDisputeButton = ({ ticket }: Props) => {
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const alert = useAlert();

	const { isLoading, mutate } = useMutation(resolveTicket, {
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
		code: ticket.code,
		strictCheck: true,
	};

	return (
		<>
			<Button
				loading={isLoading}
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

const Button = styled(AppButton)(({ theme }) => ({
	backgroundColor: `${theme.palette.secondary.main} !important`,
	color: grey['50'],
	paddingLeft: '20px',
	paddingRight: '20px',
	borderRadius: '30px',
}));

export default ResolveDisputeButton;
