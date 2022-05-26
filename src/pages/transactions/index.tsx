import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Layout from '../../components/layout';
import TransactionsTable from '../../components/table/transactions-table';
import { BOX_SHADOW } from '../../utilities/constant';
import TransactionMainBalance from '../../components/transaction-main-balance';

const Transactions = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Layout>
			<Box style={styles.container}>
				<Box sx={{ padding: '0px 2rem' }}>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h5'}>
						Transactions
					</Typography>
					<TransactionMainBalance />
				</Box>
				<TransactionsTable data={[]} />
			</Box>
		</Layout>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
});

export default Transactions;
