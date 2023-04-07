import React from 'react';
import { Box, useTheme } from '@mui/material';
import UserAvatarWithDetails from '../avatar-with-details';
import TransactionHistoryTable from '../table/user-transaction-table';
import { UserDetails } from '../../utilities';

type Props = {
	user: UserDetails | null;
};

const UserTransaction = ({ user }: Props) => {
	const theme = useTheme();
	return (
		<Box>
			<Box sx={{ padding: { xs: '0px 1rem', md: '0px 2rem' } }}>
				<UserAvatarWithDetails user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<TransactionHistoryTable user={user} />
			</Box>
		</Box>
	);
};

export default UserTransaction;
