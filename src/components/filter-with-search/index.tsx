import React, { useState } from 'react';
import { Box, MenuItem } from '@mui/material';
import FilterBy from '../form-components/filter-by';
import SearchInput from '../form-components/search-input';

const INITIAL_FILTER_VALUE = 'Filter by';

type Props = {
	isDisplayFilter?: boolean;
};

const FilterWithSearch = ({ isDisplayFilter = false }: Props) => {
	const [filterBy] = useState<string>(INITIAL_FILTER_VALUE);
	return (
		<Box
			sx={{
				display: 'flex',
				gap: '15px',
				maxWidth: isDisplayFilter ? '540px' : '320px',
				width: '100%',
				alignItems: 'center',
			}}
		>
			{isDisplayFilter && (
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
			)}
			<SearchInput fullWidth placeholder={'Search...'} />
		</Box>
	);
};

export default FilterWithSearch;
