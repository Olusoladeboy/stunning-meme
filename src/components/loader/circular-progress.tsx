import React from 'react';
import {
	CircularProgress as MuiCircularProgress,
	Box,
	BoxProps,
} from '@mui/material';

interface Props extends BoxProps {
	spinnerSize?: string | number | undefined;
}

const CircularProgress = ({ spinnerSize, ...rest }: Props) => {
	return (
		<Box {...rest} sx={{ ...rest.sx }}>
			<MuiCircularProgress size={spinnerSize} />
		</Box>
	);
};

export default CircularProgress;
