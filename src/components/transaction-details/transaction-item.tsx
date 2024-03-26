import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
	label: string;
	value: string;
	rightAside?: ReactNode;
}

const DisputeTransactionItem: React.FC<Props> = ({
	label,
	value,
	rightAside,
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gap: '6px',
			}}
		>
			<Typography sx={{ fontWeight: 'bold' }} variant={'body2'}>
				{label}:
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '6px',
				}}
			>
				<Typography
					sx={{
						fontSize: ['14px', '16px'],
					}}
					variant={'h6'}
				>
					{value}
				</Typography>
				{rightAside}
			</Box>
		</Box>
	);
};

export default DisputeTransactionItem;
