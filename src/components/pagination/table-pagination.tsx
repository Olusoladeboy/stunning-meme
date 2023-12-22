import React from 'react';
import { TablePagination as MuiTablePagination } from '@mui/material';

interface ITablePagination {
	rowsPerPageOptions?: number[];
	count: number;
	page: number;
	rowsPerPage?: number;
	onPageChange?: (value: number) => void;
	handleChangeRowsPerPage?: (value: number) => void;
}

const TablePagination: React.FC<ITablePagination> = ({
	rowsPerPageOptions = [20, 50, 100],
	count,
	page,
	rowsPerPage = 20,
	onPageChange,
	handleChangeRowsPerPage,
}) => {
	return (
		<MuiTablePagination
			variant={'footer'}
			rowsPerPageOptions={rowsPerPageOptions}
			component={'div'}
			count={count}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={(_, value: number) =>
				typeof onPageChange === 'function' && onPageChange(value)
			}
			onRowsPerPageChange={(e) =>
				typeof handleChangeRowsPerPage === 'function' &&
				handleChangeRowsPerPage(parseInt(e.target.value))
			}
		/>
	);
};

export default TablePagination;
