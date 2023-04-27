import React, { useState } from 'react';
import {
	TextField,
	InputAdornment,
	IconButton,
	BoxProps,
	Box,
	CircularProgress,
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { ThemeModeType } from '../../utilities';
import { grey, red } from '@mui/material/colors';

interface Props extends BoxProps {
	isLoading?: boolean;
	handleSearch?: (value: string) => void;
	placeholder?: string;
	fullWidth?: boolean;
	clearSearch?: () => void;
}

const SearchInput = ({
	isLoading,
	handleSearch,
	fullWidth,
	placeholder,
	clearSearch,
	...rest
}: Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	const [value, setValue] = useState('');
	const handleClose = () => {
		setValue('');
		typeof clearSearch !== 'undefined' && clearSearch();
	};
	return (
		<Box {...rest} sx={{ ...rest.sx, width: fullWidth ? '100%' : 'undefined' }}>
			<TextField
				// {...rest.style}
				fullWidth={fullWidth}
				placeholder={placeholder}
				sx={{
					// ...rest.sx,

					'& .MuiOutlinedInput-root': {
						paddingRight: '0px',
						borderRadius: '15px',
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: mode === ThemeModeType.dark ? grey[500] : 'initial',
					},
				}}
				disabled={isLoading}
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
				InputProps={{
					endAdornment: (
						<InputAdornment position='start'>
							{isLoading ? (
								<CircularProgress size={16} />
							) : (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
									{value && (
										<IconButton
											sx={{
												color: red['600'],
											}}
											onClick={handleClose}
											size={'small'}
										>
											<Close />
										</IconButton>
									)}
									<IconButton
										onClick={() =>
											typeof handleSearch !== 'undefined' &&
											value.length > 0 &&
											handleSearch(value)
										}
										size={'small'}
									>
										<Search />
									</IconButton>
								</Box>
							)}
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default SearchInput;
