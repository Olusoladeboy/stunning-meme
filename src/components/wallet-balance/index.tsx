import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { formatNumberToCurrency } from '../../utilities';
import { useAppSelector } from '../../store/hooks';

const WalletBalance = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const {
		appState: { statistics },
		authState: { canViewStatistics },
	} = useAppSelector((store) => store);
	if (canViewStatistics) {
		return (
			<Box style={styles.container}>
				<Box>
					<Typography style={styles.text} variant={'h6'}>
						Total
					</Typography>
					<Typography style={styles.text} variant={'h6'}>
						Wallet Balance
					</Typography>
				</Box>
				<Typography style={styles.text} variant={'h5'}>
					{formatNumberToCurrency(
						statistics ? statistics.total_wallet_balance : '---'
					)}
				</Typography>
			</Box>
		);
	}

	return null;
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: theme.spacing(4),
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: theme.spacing(3),
		borderRadius: theme.spacing(2),
		boxShadow: `0px 0px 8px rgba(0, 0, 0, 0.1)`,
		backgroundColor: grey[50],
	},
	text: {
		fontWeight: '600',
	},
});

export default WalletBalance;
