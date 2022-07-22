import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
	name: string;
	rate: string;
};

const AvaliableNetworkItem = ({ name, rate }: Props) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: '7fr 3fr',
				gap: (theme) => theme.spacing(3),
			}}
		>
			<Typography
				sx={{
					color: theme.palette.secondary.main,
					fontSize: '16px',
					textTransform: 'uppercase',
				}}
				variant={'body1'}
			>
				{name} -
			</Typography>
			<Typography sx={{ color: grey[50], fontSize: '16px' }} variant={'body1'}>
				{rate}%
			</Typography>
		</Box>
	);
};

export default AvaliableNetworkItem;
