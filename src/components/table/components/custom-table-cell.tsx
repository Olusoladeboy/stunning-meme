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
					flexWrap: 'nowrap',
					gap: (theme) => theme.spacing(1),
					span: {
						whiteSpace: 'nowrap',
					},
					...rest.sx,
				}}
				{...rest}
			>
				<span>{label}</span>
				{isSortable && <FilterIcon />}
			</Box>
		</StyledTableCell>
	);
};

export default CustomTableCell;
