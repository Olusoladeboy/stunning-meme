import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import formatNumberToCurrency from '../../utilities/helpers/formatNumberToCurrency';
import { grey } from '@mui/material/colors';

type Props = {
	description: string;
	amount: string | number;
};

const ListItem = ({ amount, description }: Props) => {
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
				{amount ? formatNumberToCurrency(amount) : formatNumberToCurrency(0)}
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
