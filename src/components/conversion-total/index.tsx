import React from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Refresh } from '@mui/icons-material';
import { formatNumberToCurrency } from '../../utilities';

type Props = {
	total?: number;
	handleRefresh?: () => void;
};

const ConversionTotal = ({ total = 0, handleRefresh }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Box style={styles.main}>
				<Box>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h6'}>
						Total Conversions
					</Typography>
					<Typography variant={'h4'}>
						{formatNumberToCurrency(500000)}
					</Typography>
				</Box>
				<Box style={styles.verticalLine} />
				<Box>
					<Typography sx={{ marginBottom: theme.spacing(2) }} variant={'h4'}>
						{total}
					</Typography>
					<Typography variant={'h6'}>Total conversions</Typography>
				</Box>
			</Box>
			<IconButton
				onClick={() => typeof handleRefresh !== 'undefined' && handleRefresh()}
				style={styles.refreshBtn}
			>
				<Refresh />
			</IconButton>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		backgroundColor: theme.palette.secondary.main,
		padding: `1.5rem 1rem`,
		borderRadius: theme.spacing(2),
		color: grey[50],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: theme.spacing(2),
	},
	main: {
		display: 'flex',
		// alignItems: 'center',
		gap: theme.spacing(4),
	},
	verticalLine: {
		width: '3px',
		minHeight: '100%',
		backgroundColor: grey[50],
	},
	refreshBtn: {
		backgroundColor: grey[50],
		color: theme.palette.secondary.main,
	},
});

export default ConversionTotal;
