import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAppSelector } from '../../store/hooks';
import { ThemeModeType } from '../../utilities';

type Props = {
	isLoading?: boolean;
};

const TextInput = (props: TextFieldProps & Props) => {
	const { mode } = useAppSelector((store) => store.theme);
	return (
		<TextField
			{...props}
			sx={{
				...props.sx,
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: mode === ThemeModeType.dark ? grey[500] : 'initial',
				},
			}}
			disabled={props.disabled || props.isLoading}
		/>
	);
};

export default TextInput;
