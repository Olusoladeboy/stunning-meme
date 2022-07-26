import React, { useState } from 'react';
import {
	TextField,
	InputAdornment,
	IconButton,
	BoxProps,
	Box,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { ThemeModeType } from '../../utilities/types';
import { grey } from '@mui/material/colors';

interface Props extends BoxProps {
	isLoading?: boolean;
	handleSearch?: (value: string) => void;
	placeholder?: string;
	fullWidth?: boolean;
}

const SearchInput = ({
	isLoading,
	handleSearch,
	fullWidth,
	placeholder,
	...rest
}: Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	const [value, setValue] = useState('');
	return (
		<Box {...rest}>
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
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default SearchInput;
