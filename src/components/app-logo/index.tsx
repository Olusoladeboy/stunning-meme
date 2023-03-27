import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {}

const AppLogo: React.FC<Props> = (props) => {
	return (
		<Box {...props}>
			<img
				src={require('../../assets/images/app-logo.png')}
				alt='airtime-logo'
			/>
		</Box>
	);
};

export default AppLogo;
