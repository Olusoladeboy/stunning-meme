import React from 'react';
import {
	Button as MuiButton,
	ButtonProps,
	CircularProgress,
} from '@mui/material';

interface Props extends ButtonProps {
	loading?: boolean;
}

const Button = (props: Props) => {
	const { children, loading } = props;
	return (
		<MuiButton disabled={loading} {...props}>
			{loading ? <CircularProgress /> : children}
		</MuiButton>
	);
};

export default Button;
