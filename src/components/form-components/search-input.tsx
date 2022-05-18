import React from 'react';
import {
	TextField,
	TextFieldProps,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import { ThemeModeType } from '../../utilities/types';
import { grey } from '@mui/material/colors';

type Props = {
	isLoading?: boolean;
};

const SearchInput = (props: TextFieldProps & Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<TextField
			{...props}
			sx={{
				...props.sx,
				'& .MuiOutlinedInput-root': {
					paddingRight: '0px',
					borderRadius: '15px',
				},
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: mode === ThemeModeType.dark ? grey[500] : 'initial',
				},
			}}
			disabled={props.isLoading}
			InputProps={{
				endAdornment: (
					<InputAdornment position='start'>
						<IconButton size={'small'}>
							<Search />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default SearchInput;
