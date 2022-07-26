import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import FilterWithSearch from '../filter-with-search';
import BackButton from '../back-button';

interface Props extends BoxProps {
	title?: string;
	hideTitle?: boolean;
	isDisplayBackButton?: boolean;
	backButtonText?: string;
	isDisplayFilter?: boolean;
}

const TableHeader = ({
	title,
	sx,
	isDisplayBackButton,
	backButtonText,
	isDisplayFilter,
	style,
}: Props) => {
	return (
		<Box
			style={style}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent:
					title || isDisplayBackButton ? 'space-between' : 'flex-end',
				padding: '10px 0px',
				...sx,
			}}
		>
			{title ? (
				<Typography sx={{ fontWeight: '600' }} variant={'h5'}>
					{title}
				</Typography>
			) : (
				isDisplayBackButton && <BackButton text={backButtonText} />
			)}
			<FilterWithSearch isDisplayFilter={isDisplayFilter} />
		</Box>
	);
};

export default TableHeader;
