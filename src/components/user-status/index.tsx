import React from 'react';
import { grey } from '@mui/material/colors';
import { Box, Typography, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import UserAvatarWithDetails from '../avatar-with-details';
import CustomButton from '../button/custom-button';
import SuspendUserForm from '../forms/suspend-user-form';
import DeleteUserForm from '../forms/delete-user-form';
import { User, QueryKey } from 'utilities';
import { useAlert, useHandleError } from 'hooks';
import { suspendWithdraw } from 'api';

type Props = {
	user: User | null;
};

const UserStatus = ({ user }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const queryClient = useQueryClient();

	const { mutate, isLoading } = useMutation(suspendWithdraw, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				setAlert({ message: data.message, type: 'success' });
				queryClient.invalidateQueries(QueryKey.AllUsers);
				queryClient.invalidateQueries(QueryKey.GetSingleUser);
				queryClient.invalidateQueries(QueryKey.Statistics);
			}
		},
	});

	const handleSuspendWithdraw = () =>
		mutate({
			data: {
				suspended: user?.suspended as boolean,
				suspendWithdrawal: !user?.suspendWithdrawal,
			},
			id: user?.id as string,
		});

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
					marginBottom: theme.spacing(5),
				}}
			>
				<UserAvatarWithDetails user={user} />
				<CustomButton
					loading={isLoading}
					onClick={(e: React.FormEvent<HTMLButtonElement>) => {
						e.preventDefault();
						handleSuspendWithdraw();
					}}
					sx={{
						border: `1px solid ${theme.palette.secondary.main}`,
						':hover': {
							backgroundColor: theme.palette.secondary.main,
							color: grey[50],
						},
					}}
					size={'large'}
				>
					{user?.suspendWithdrawal
						? 'Unsuspend withdrawal'
						: 'Suspend Withdrawal'}
				</CustomButton>
			</Box>
			<Box>
				<Typography sx={{ marginBottom: theme.spacing(4) }} variant={'h5'}>
					User Status
				</Typography>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
						gap: {
							xs: theme.spacing(3),
							md: theme.spacing(7),
						},
					}}
				>
					<SuspendUserForm user={user} />
					<DeleteUserForm user={user} />
				</Box>
			</Box>
		</Box>
	);
};

export default UserStatus;
