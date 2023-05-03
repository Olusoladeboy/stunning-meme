import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Button from '../button/custom-button';
import ModalWrapper from './Wrapper';
import Image from '../image';

interface Props {
	image: string;
	close?: () => void;
	handleSave?: () => void;
	isLoading?: boolean;
}

const PreviewProfileImageModal = ({
	image,
	close,
	handleSave,
	isLoading,
}: Props) => {
	const theme = useTheme();

	return (
		<ModalWrapper closeModal={close}>
			<Box sx={{}}>
				<Typography sx={{ marginBottom: '10px' }} variant={'h6'}>
					{'Save Profile Image'}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: '2rem',
						gap: theme.spacing(4),
					}}
				>
					<Box sx={{ maxWidth: '360px' }}>
						<Image src={image} alt={'profile'} />
					</Box>

					<Button
						loading={isLoading}
						onClick={handleSave}
						size={'large'}
						sx={{
							backgroundColor: `${theme.palette.secondary.main} !important`,
							color: grey[50],
							fontWeight: '600',
							minWidth: '200px',
						}}
					>
						Save
					</Button>
				</Box>
			</Box>
		</ModalWrapper>
	);
};

export default PreviewProfileImageModal;
