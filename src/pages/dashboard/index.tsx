import React from 'react';
import { Box, useTheme } from '@mui/material';
import {
	Layout,
	WalletBalance,
	TotalTransactions,
	TotalUsers,
	TotalConversions,
	WalletOverview,
	UserRecord,
	TaskList,
	RecentConversionsTable,
	RecentTransactionsTable,
} from '../../components';

const Dashboard = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Layout>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '5.5fr 4.5fr',
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '1fr',
							gap: theme.spacing(4),
						}}
					>
						<WalletBalance />
						<Box style={styles.transactionGrid}>
							<TotalTransactions />
							<TotalUsers />
							<TotalConversions />
						</Box>
						<RecentConversionsTable />
						<RecentTransactionsTable />
					</Box>
				</Box>
				<Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: theme.spacing(4),
						}}
					>
						<WalletOverview />
						<UserRecord />
						<TaskList />
					</Box>
				</Box>
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	transactionGrid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: theme.spacing(3),
	},
});

export default Dashboard;
