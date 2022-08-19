import React from 'react';
import { Box, useTheme } from '@mui/material';
import UserAvatarWithDetails from '../avatar-with-details';
import UserWallet from '../user-wallet';
import WalletSummaryTable from '../table/wallet-summary-table';
import { UserDetailsType } from '../../utilities/types';

type Props = {
	user: UserDetailsType | null;
};

const UserWalletSummary = ({ user }: Props) => {
	const theme = useTheme();
	return (
		<Box>
			<Box
				sx={{
					padding: { xs: '0px 1rem', md: '0px 2rem' },
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
				}}
			>
				<UserAvatarWithDetails user={user} />
				<UserWallet user={user} />
			</Box>
			<Box sx={{ marginTop: theme.spacing(4) }}>
				<WalletSummaryTable user={user} />
			</Box>
		</Box>
	);
};

export default UserWalletSummary;
