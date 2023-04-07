import React from 'react';
import { Box, BoxProps } from '@mui/material';
import FilterIcon from '../../icons/filter';
import { StyledTableCell } from '.';

interface Props extends BoxProps {
	label: string;
	isSortable?: boolean;
}

const CustomTableCell = ({ label, isSortable = false, ...rest }: Props) => {
	return (
		<StyledTableCell>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: (theme) => theme.spacing(1),
					...rest.sx,
				}}
				{...rest}
			>
				{label}
				{isSortable && <FilterIcon />}
			</Box>
		</StyledTableCell>
	);
};

export default CustomTableCell;
