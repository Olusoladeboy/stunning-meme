import React from 'react';
import { Box, TableCell, TableRow, TableCellProps } from '@mui/material';
import Empty from './';

interface TTableEmptyProps extends TableCellProps {
	text?: string;
}

const TableEmpty = ({ text, ...rest }: TTableEmptyProps) => {
	return (
		<TableRow>
			<TableCell {...rest}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Empty text={text} />
				</Box>
			</TableCell>
		</TableRow>
	);
};

export default TableEmpty;
