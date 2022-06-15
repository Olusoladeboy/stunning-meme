import React from 'react';
import {
	CircularProgress,
	Box,
	TableCell,
	TableRow,
	TableCellProps,
} from '@mui/material';

interface TableLoaderProps extends TableCellProps {}

const TableLoader = (props: TableLoaderProps) => {
	const { colSpan } = props;
	return (
		<TableRow>
			<TableCell colSpan={colSpan}>
				<Box sx={{ display: 'flex' }}>
					<CircularProgress sx={{ margin: 'auto', alignSelf: 'center' }} />
				</Box>
			</TableCell>
		</TableRow>
	);
};

export default TableLoader;
