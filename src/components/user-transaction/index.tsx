import React from 'react';
import { Box, useTheme } from '@mui/material';
import UserAvatarWithDetails from '../user-avatar-with-details';
import TransactionHistoryTable from '../table/transaction-history-table';

const UserTransaction = () => {
	const theme = useTheme();
	return (
		<Box>
			<UserAvatarWithDetails />
			<Box sx={{ marginTop: theme.spacing(4) }}>
				{/* <TransactionHistoryTable data={[]} /> */}
			</Box>
		</Box>
	);
};

export default UserTransaction;
