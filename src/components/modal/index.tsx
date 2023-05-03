import React, { CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Lottie from 'react-lottie';
import Button from '../button';
import { grey } from '@mui/material/colors';
import ModalWrapper from './Wrapper';
import { DANGER_COLOR, ModalDetails } from '../../utilities';
import * as success from '../../assets/json-file/success.json';
import * as failed from '../../assets/json-file/failed.json';

const Modal = ({
	type,
	title,
	message,
	buttonText = 'Ok',
	handlePress,
	handleClose,
	children,
	isLoading,
}: ModalDetails) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	// Lottie Option
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: type === 'success' ? success : failed,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<ModalWrapper
			hasCloseButton
			closeModal={() => typeof handleClose !== 'undefined' && handleClose()}
		>
			<Box style={styles.main as CSSProperties}>
				{type && <Lottie options={defaultOptions} height={140} width={140} />}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						gap: theme.spacing(2),
						marginBottom: theme.spacing(2),
					}}
				>
					<Typography
						sx={{
							fontWeight: '600',
							fontSize: '20px',
						}}
						variant={'body1'}
					>
						{title}
					</Typography>
					{message && (
						<Typography sx={{ textAlign: 'center' }} variant={'body1'}>
							{message}
						</Typography>
					)}
				</Box>

				{children}
				<Button
					disabled={isLoading}
					onClick={() => typeof handlePress !== 'undefined' && handlePress()}
					fullWidth
					size={'large'}
					sx={{
						backgroundColor: theme.palette.secondary.main,
						color: grey[50],
						fontWeight: '600',
						':hover': {
							backgroundColor: theme.palette.secondary.main,
						},
					}}
				>
					{buttonText}
				</Button>
			</Box>
		</ModalWrapper>
	);
};

const useStyles = (theme: any) => ({
	main: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		gap: '20px',
		position: 'relative',
	},
	closeButton: {
		position: 'absolute',
		right: '0px',
		top: '0px',
		color: DANGER_COLOR,
	},
});

export default Modal;
