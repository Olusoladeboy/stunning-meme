import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
	src: any;
	alt?: string;
}

const Image = ({ src, alt = '', ...rest }: Props) => {
	return (
		<Box {...rest}>
			<img src={src} alt={alt} />
		</Box>
	);
};

export default Image;
