import React, { ChangeEvent } from 'react';
import { Box, FormHelperText, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';

type Props = {
	rows?: number;
	cols?: number;
	error?: boolean;
	helperText?: string | false;
	value?: string;
	fullWidth?: boolean;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
};

const TextArea = ({
	error,
	helperText,
	fullWidth,
	onChange,
	...rest
}: Props) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				'& textarea:hover': {
					outlineColor: `${theme.palette.primary.main}`,
				},
				'& textarea:focus': {
					outlineColor: error ? red[800] : `${theme.palette.primary.main}`,
				},
			}}
		>
			<textarea
				{...rest}
				onChange={(e: any) => typeof onChange !== 'undefined' && onChange(e)}
				style={{
					resize: 'none',
					width: fullWidth ? '100%' : 'undefined',
					padding: '16.5px 14px',
					fontStyle: 'inherit',
					fontFamily: 'inherit',
					color: 'inherit',
					borderColor: error ? red[800] : theme.palette.primary.main,
					borderRadius: theme.spacing(1),
				}}
			></textarea>
			{helperText && (
				<FormHelperText sx={{ color: red[800] }}>{helperText}</FormHelperText>
			)}
		</Box>
	);
};

export default TextArea;
