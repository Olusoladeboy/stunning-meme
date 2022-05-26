import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';

const TransactionMainBalance = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Typography
				sx={{ marginBottom: theme.spacing(1) }}
				style={styles.text}
				variant={'body1'}
			>
				Main balance
			</Typography>
			<Typography style={styles.text} variant={'h4'}>
				{formatNumberToCurrency(5000000)}
			</Typography>
		</Box>
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
