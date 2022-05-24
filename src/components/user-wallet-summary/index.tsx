import React from 'react';
import { Box, useTheme } from '@mui/material';
import UserAvatarWithDetails from '../user-avatar-with-details';
import UserWallet from '../user-wallet';
import WalletSummaryTable from '../table/wallet-summary-table';

const UserWalletSummary = () => {
	const theme = useTheme();
	return (
		<Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
				}}
			>
				<UserAvatarWithDetails />
				<UserWallet />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<WalletSummaryTable data={[]} />
			</Box>
		</Box>
	);
};

export default UserWalletSummary;
