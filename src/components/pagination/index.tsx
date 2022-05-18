import React from 'react';
import { Pagination as MuiPagination, PaginationProps } from '@mui/material';

const Pagination = (props: PaginationProps) => {
	return <MuiPagination {...props} />;
};

export default Pagination;
