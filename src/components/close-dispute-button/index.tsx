import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from '@mui/material/styles';
import { Ticket } from '../../utilities/types';
import { DANGER_COLOR } from '../../utilities/constant';
import Api from '../../utilities/api';
import Spinner from '../loader';
import { useAlert } from '../../utilities/hooks';
import { QueryKey } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';

interface Props {
	ticket: Ticket;
}

const CloseDispute = ({ ticket }: Props) => {
	const queryClient = useQueryClient();
	const { token } = useAppSelector((store) => store.authState);
	const alert = useAlert();

	const { isLoading, mutate } = useMutation(Api.Ticket.Close, {
		onSettled: (data, error) => {
			if (error) {
				alert({ data: error, type: 'error' });
			}

			if (data && data.success) {
				queryClient.invalidateQueries(QueryKey.Ticket);
				queryClient.invalidateQueries(ticket.id);
				alert({ data: data.message, type: 'success' });
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
						token: token as string,
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
