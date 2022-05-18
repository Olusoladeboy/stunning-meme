import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WalletIcon from '../icons/wallet';
import { grey } from '@mui/material/colors';
import ListItem from './list-item';

const WalletOverview = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Box style={styles.header}>
				<Typography variant={'body1'} style={styles.headerText}>
					Wallet Overview
				</Typography>
				<WalletIcon />
			</Box>
			<Box>
				<ListItem description={'Total Data Sold'} amount={'150000'} />
				<ListItem description={'Total Airtime Converted'} amount={'150000'} />
				<ListItem description={'Total Amount Withdrawn'} amount={'150000'} />
				<ListItem description={'Total Wallet Transfer'} amount={'150000'} />
				<ListItem description={'Total Wallet Transaction'} amount={'150000'} />
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
