import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import FilterWithSearch from '../filter-with-search';
import BackButton from '../back-button';

interface Props extends BoxProps {
	title?: string;
	hideTitle?: boolean;
	isDisplayBackButton?: boolean;
	backButtonText?: string;
}

const TableHeader = (props: Props) => {
	const { title, sx, isDisplayBackButton, backButtonText } = props;
	return (
		<Box
			style={props.style}
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
			<FilterWithSearch />
		</Box>
	);
};

export default TableHeader;
