import React from 'react';
import {
	CircularProgress,
	Box,
	TableCell,
	TableRow,
	TableCellProps,
	Typography,
} from '@mui/material';

interface TableLoaderProps extends TableCellProps {}

const TableLoader = (props: TableLoaderProps) => {
	const { colSpan } = props;
	return (
		<TableRow>
			<TableCell colSpan={colSpan}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						gap: '8px',
					}}
				>
					<CircularProgress sx={{ margin: 'auto', alignSelf: 'center' }} />
					<Typography variant={'body2'}>Loading...</Typography>
				</Box>
			</TableCell>
		</TableRow>
	);
};

export default TableLoader;
