import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { formatNumberToCurrency } from '../../utilities';
import { grey } from '@mui/material/colors';

type Props = {
	description: string;
	value: string | number;
	isAmount?: boolean;
};

const ListItem = ({ value, description, isAmount = true }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Typography style={styles.text} variant={'body1'}>
				{description}
			</Typography>
			<Typography
				sx={{ fontWeight: '600' }}
				style={styles.text}
				variant={'body1'}
			>
				{isAmount
					? value
						? formatNumberToCurrency(value)
						: formatNumberToCurrency(0)
					: value}
			</Typography>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '10px 0px',
	},
	text: {
		color: grey[50],
	},
});

export default ListItem;
