import React from 'react';
import { Box, useTheme } from '@mui/material';
import Layout from '../../components/layout';
import WalletBalance from '../../components/wallet-balance';
import TotalTransactions from '../../components/summary-item/total-transactions';
import TotalUsers from '../../components/summary-item/total-users';
import TotalConversions from '../../components/summary-item/total-conversions';
import WalletOverview from '../../components/wallet-overview';
import UserRecords from '../../components/user-record';
import TaskList from '../../components/task-list';
import RecentConversionsTable from '../../components/table/recent-conversions';
import conversions from '../../utilities/data/conversions.json';
import RecentTransactionsTable from '../../components/table/recent-transactions';

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
						<RecentConversionsTable  />
						<RecentTransactionsTable data={[]} />
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
						<UserRecords />
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
