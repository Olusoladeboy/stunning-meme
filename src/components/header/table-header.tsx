import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import BackButton from '../back-button';
import SearchInput from '../form-components/search-input';

interface Props extends BoxProps {
	title?: any;
	hideTitle?: boolean;
	isDisplayBackButton?: boolean;
	backButtonText?: string;
	isDisplayFilter?: boolean;
	searchPlaceholder?: string;
	handleSearch?: (value: string) => void;
	clearSearch?: () => void;
}

const TableHeader = ({
	title,
	sx,
	isDisplayBackButton,
	searchPlaceholder = 'Search...',
	backButtonText,
	handleSearch,
	clearSearch,
	style,
	...rest
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
				<>
					{typeof title === 'string' ? (
						<Typography sx={{ fontWeight: '600' }} variant={'h5'}>
							{title}
						</Typography>
					) : (
						title
					)}
				</>
			) : (
				isDisplayBackButton && <BackButton text={backButtonText} />
			)}
			<SearchInput
				fullWidth
				sx={{ maxWidth: '320px' }}
				placeholder={rest.placeholder || searchPlaceholder}
				handleSearch={handleSearch}
				clearSearch={clearSearch}
			/>
		</Box>
	);
};

export default TableHeader;
