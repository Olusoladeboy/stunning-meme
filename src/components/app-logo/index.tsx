import React from 'react';
import { Box, BoxProps } from '@mui/material';

type Props = {};

const AppLogo = (props: BoxProps) => {
	return (
		<Box>
			<img
				src={require('../../assets/images/app-logo.png')}
				alt='airtime-logo'
			/>
		</Box>
	);
};

export default AppLogo;
