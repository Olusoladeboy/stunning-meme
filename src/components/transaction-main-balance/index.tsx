import React from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatNumberToCurrency } from 'utilities';
import { useAppSelector } from 'store/hooks';

const TransactionMainBalance = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics, isLoadingStatistics } = useAppSelector(
		(store) => store.appState
	);
	return (
		<>
			{isLoadingStatistics ? (
				<CircularProgress />
			) : (
				<Box sx={{ gap: ['20px', '2rem', '4rem'] }} style={styles.container}>
					<Box>
						<Typography
							sx={{ marginBottom: theme.spacing(1) }}
							style={styles.text}
							variant={'body1'}
						>
							Credit transaction balance
						</Typography>
						<Typography style={styles.text} variant={'h4'}>
							{statistics &&
								formatNumberToCurrency(
									statistics.total_wallet_transaction?.credit
								)}
						</Typography>
					</Box>
					<Box>
						<Typography
							sx={{ marginBottom: theme.spacing(1) }}
							style={styles.text}
							variant={'body1'}
						>
							Debit transaction balance
						</Typography>
						<Typography style={styles.text} variant={'h4'}>
							{statistics &&
								formatNumberToCurrency(
									statistics.total_wallet_transaction?.debit
								)}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		display: 'flex',
	},
	text: {
		color: theme.palette.secondary.main,
	},
});

export default TransactionMainBalance;
