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
				alignItems: { sm: 'center' },
				flexDirection: {
					xs: 'column',
					sm: 'row',
				},
				gap: '20px',
				justifyContent:
					title || isDisplayBackButton ? 'space-between' : 'flex-end',
				// padding: '10px 0px',
				...sx,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
				{isDisplayBackButton && <BackButton text={backButtonText} />}
				{title && typeof title === 'string' ? (
					<Typography sx={{ fontWeight: '600' }} variant={'h5'}>
						{title}
					</Typography>
				) : (
					title
				)}
			</Box>

			<SearchInput
				fullWidth
				sx={{ maxWidth: { xs: '100%', sm: '320px' } }}
				placeholder={rest.placeholder || searchPlaceholder}
				handleSearch={handleSearch}
				clearSearch={clearSearch}
			/>
		</Box>
	);
};

export default TableHeader;
