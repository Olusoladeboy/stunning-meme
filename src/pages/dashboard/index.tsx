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
} from 'components';
import { useAppSelector } from 'store/hooks';

const LargeView = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { canViewStatistics } = useAppSelector((store) => store.authState);
	return (
		<Box
			sx={{
				// display: 'grid',
				gridTemplateColumns: '5.5fr 4.5fr',
				gap: theme.spacing(4),
				display: {
					xs: 'none',
					lg: 'grid',
				},
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
					{canViewStatistics && (
						<Box
							sx={{
								gridTemplateColumns: 'repeat(3, 1fr)',
							}}
							style={styles.transactionGrid}
						>
							<TotalTransactions />
							<TotalUsers />
							<TotalConversions />
						</Box>
					)}
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
					{canViewStatistics && <UserRecord />}
					<TaskList />
				</Box>
			</Box>
		</Box>
	);
};

const MobileView = () => {
	const theme = useTheme();
	const styles = useStyles(theme);

	return (
		<Box
			sx={{
				display: { xs: 'grid', lg: 'none' },
				gridTemplateColumns: '1fr',
				gap: theme.spacing(4),
			}}
		>
			<WalletBalance />
			<WalletOverview />
			<Box
				sx={{
					gridTemplateColumns: {
						xs: '1fr',
						sm: 'repeat(3,  1fr)',
					},
				}}
				style={styles.transactionGrid}
			>
				<TotalTransactions />
				<TotalUsers />
				<TotalConversions />
			</Box>
			<UserRecord />
			<RecentConversionsTable />
			<RecentTransactionsTable />
			<TaskList />
		</Box>
	);
};

const Dashboard = () => {
	return (
		<Layout>
			<LargeView />
			<MobileView />
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	transactionGrid: {
		display: 'grid',

		gap: theme.spacing(3),
	},
});

export default Dashboard;
