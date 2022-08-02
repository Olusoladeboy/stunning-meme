import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WalletIcon from '../icons/wallet';
import { grey } from '@mui/material/colors';
import ListItem from './list-item';
import { useAppSelector } from '../../store/hooks';

const WalletOverview = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { statistics } = useAppSelector((store) => store.appState);
	return (
		<Box style={styles.container}>
			<Box style={styles.header}>
				<Typography variant={'body1'} style={styles.headerText}>
					Wallet Overview
				</Typography>
				<WalletIcon />
			</Box>
			<Box>
				<ListItem
					description={'Total Data Sold'}
					amount={statistics ? statistics.total_data_sold : ''}
				/>
				<ListItem
					description={'Total Airtime Converted'}
					amount={statistics ? statistics.total_conversions : ''}
				/>
				<ListItem
					description={'Total Amount Withdrawn'}
					amount={statistics ? statistics.total_amount_withdrawn : ''}
				/>
				<ListItem
					description={'Total Wallet Transfer'}
					amount={statistics ? statistics.total_wallet_transfer : ''}
				/>
				<ListItem
					description={'Total Wallet Transaction(Credit)'}
					amount={statistics ? statistics.total_wallet_transaction.credit : ''}
				/>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		backgroundColor: '#3D3D3D',
		padding: theme.spacing(3),
		borderRadius: theme.spacing(2),
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(2),
	},
	headerText: {
		color: grey[50],
		fontWeight: '600',
		fontSize: '15px',
	},
});

export default WalletOverview;
