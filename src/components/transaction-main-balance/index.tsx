import React from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import { useAppSelector } from '../../store/hooks';

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
				<Box style={styles.container}>
					<Typography
						sx={{ marginBottom: theme.spacing(1) }}
						style={styles.text}
						variant={'body1'}
					>
						Main balance
					</Typography>
					<Typography style={styles.text} variant={'h4'}>
						{statistics &&
							formatNumberToCurrency(statistics.total_wallet_balance)}
					</Typography>
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
	},
	text: {
		color: theme.palette.secondary.main,
	},
});

export default TransactionMainBalance;
