import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import UserAvatarWithDetails from '../avatar-with-details';
import Button from '../button';
import { grey } from '@mui/material/colors';
import SuspendUserForm from '../forms/suspend-user-form';
import DeleteUserForm from '../forms/delete-user-form';
import { UserDetailsType } from '../../utilities/types';

type Props = {
	user: UserDetailsType | null;
};

const UserStatus = ({ user }: Props) => {
	const theme = useTheme();
	// return null;
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
				<Button
					size={'large'}
					sx={{
						border: `1px solid ${theme.palette.secondary.main}`,
						':hover': {
							backgroundColor: theme.palette.secondary.main,
							color: grey[50],
						},
					}}
				>
					Suppend Withdrawal
				</Button>
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
					<SuspendUserForm />
					{/* <DeleteUserForm /> */}
				</Box>
			</Box>
		</Box>
	);
};

export default UserStatus;
