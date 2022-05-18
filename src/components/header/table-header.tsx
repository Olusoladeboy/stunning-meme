import React, { useState } from 'react';
import { Box, Typography, MenuItem, BoxProps } from '@mui/material';
import SearchInput from '../form-components/search-input';
import FilterBy from '../form-components/filter-by';

interface Props extends BoxProps {
	title: string;
}

const INITIAL_FILTER_VALUE = 'Filter by';

const TableHeader = (props: Props) => {
	const [filterBy] = useState<string>(INITIAL_FILTER_VALUE);
	const { title, sx } = props;
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '10px 0px',
				...sx,
			}}
		>
			<Typography sx={{ fontWeight: '500' }} variant={'h5'}>
				{title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					gap: '15px',
					maxWidth: '540px',
					width: '100%',
					alignItems: 'center',
				}}
			>
				<FilterBy
					selectProps={{
						value: filterBy,
					}}
					sx={{ maxWidth: '200px' }}
				>
					<MenuItem value={filterBy} disabled>
						Filter by
					</MenuItem>
					<MenuItem value={filterBy}>Name</MenuItem>
				</FilterBy>
				<SearchInput fullWidth placeholder={'Search...'} />
			</Box>
		</Box>
	);
};

export default TableHeader;
