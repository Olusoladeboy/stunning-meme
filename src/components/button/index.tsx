import React from 'react';
import {
	Button as MuiButton,
	ButtonProps,
	CircularProgress,
} from '@mui/material';

interface Props extends ButtonProps {
	loading?: boolean;
}

const Button: React.FC<Props> = ({ loading, children, ...rest }) => {
	return (
		<MuiButton disabled={loading} {...rest}>
			{loading ? <CircularProgress /> : children}
		</MuiButton>
	);
};

export default Button;
