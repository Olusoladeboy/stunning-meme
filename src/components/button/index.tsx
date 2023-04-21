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
		<MuiButton
			disabled={loading}
			{...rest}
			startIcon={
				loading && <CircularProgress size={'22px'} sx={{ color: 'inherit' }} />
			}
		>
			{loading ? 'Loading...' : children}
		</MuiButton>
	);
};

export default Button;
