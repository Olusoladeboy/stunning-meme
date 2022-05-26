import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import FilterWithSearch from '../filter-with-search';

interface Props extends BoxProps {
	title?: string;
	hideTitle?: boolean;
}

const TableHeader = (props: Props) => {
	const { title, sx } = props;
	return (
		<Box
			style={props.style}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: title ? 'space-between' : 'flex-end',
				padding: '10px 0px',
				...sx,
			}}
		>
			{title && (
				<Typography sx={{ fontWeight: '500' }} variant={'h5'}>
					{title}
				</Typography>
			)}
			<FilterWithSearch />
		</Box>
	);
};

export default TableHeader;
