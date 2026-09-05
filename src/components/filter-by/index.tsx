import { useTheme, Box } from '@mui/material';
import React from 'react';
import Button from '../button';

const FilterBy = () => {
	const theme = useTheme();
	return (
		<Button
			sx={{
				border: `1px solid `,
			}}
		>
			FilterBy
		</Button>
	);
};

export default FilterBy;
