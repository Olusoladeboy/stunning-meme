import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import Image from '../image';
import { grey } from '@mui/material/colors';

interface Props extends BoxProps {
	src: string;
}

const ImagePreview = ({ src, ...rest }: Props) => {
	return (
		<Box
			{...rest}
			sx={{ ...rest.sx, backgroundColor: grey[600], color: grey[300] }}
		>
			{src ? (
				<Image src={src} alt={'image-priview'} />
			) : (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						height: '100%',
						width: '100%',
					}}
				>
					<ImageIcon sx={{ fontSize: '40px' }} />
					<Typography variant={'body1'}>Image Preview</Typography>
				</Box>
			)}
		</Box>
	);
};

export default ImagePreview;
