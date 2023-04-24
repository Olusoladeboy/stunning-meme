import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
	label: string;
	value: string;
}

const DisputeTransactionItem: React.FC<Props> = ({ label, value }) => {
	return (
		<Box>
			<Typography sx={{ marginBottom: '8px' }} variant={'body1'}>
				{label}
			</Typography>
			<Typography variant={'h6'}>{value}</Typography>
		</Box>
	);
};

export default DisputeTransactionItem;
