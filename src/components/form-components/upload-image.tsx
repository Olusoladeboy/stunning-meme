import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, BoxProps } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Props extends BoxProps {
	setFile: (file: any) => void;
}

const UploadImage = ({ setFile, ...rest }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: any) => {
			setFile(acceptedFiles[0]);
		},
		// eslint-disable-next-line
		[]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Box {...rest} {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Typography variant={'body1'}>Drop the image here ...</Typography>
			) : (
				<Box
					sx={{
						padding: '3rem 20px',
						backgroundColor: '#FDEDD7',
						borderRadius: '5px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						cursor: 'pointer',
						height: '100%',
					}}
				>
					<PhotoCamera sx={{ color: grey[600], fontSize: '40px' }} />
					<Typography sx={{ textAlign: 'center' }} variant={'body1'}>
						Click to Upload Image
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default UploadImage;
