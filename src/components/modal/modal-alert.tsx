import React, { CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Lottie from 'react-lottie';
import Button from '../button';
import { grey } from '@mui/material/colors';
import ModalWrapper from './Wrapper';
import { DANGER_COLOR } from 'utilities';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { setModalAlert } from 'store/app';
import * as success from 'assets/json-file/success.json';
import * as failed from 'assets/json-file/failed.json';
// import * as pending from 'assets/json-file/pending.json';

const ModalAlert = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const closeModal = () => dispatch(setModalAlert(null));

	const { modalAlert } = useAppSelector((store) => store.appState);

	// Lottie Option
	const defaultOptions = (animationData: any) => ({
		loop: false,
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	});

	if (modalAlert) {
		const {
			title,
			message,
			primaryButtonText,
			secondaryButtonText,
			onClickPrimaryButton,
			onClickSecondaryButton,
			children,
			type,
		} = modalAlert;
		return (
			<ModalWrapper closeModal={closeModal}>
				<Box style={styles.main as CSSProperties}>
					<Box>
						{type === 'success' && (
							<Lottie
								options={defaultOptions(success)}
								height={140}
								width={140}
							/>
						)}
						{type === 'error' && (
							<Lottie
								options={defaultOptions(failed)}
								height={140}
								width={140}
							/>
						)}
					</Box>
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
						<Typography sx={{ textAlign: 'center' }} variant={'body1'}>
							{message}
						</Typography>
					</Box>
					<Box>{children}</Box>
					{primaryButtonText && (
						<Button
							onClick={onClickPrimaryButton}
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
							{primaryButtonText}
						</Button>
					)}

					{secondaryButtonText && (
						<Button
							onClick={onClickSecondaryButton}
							fullWidth
							size={'large'}
							sx={{
								backgroundColor: (theme) => theme.palette.secondary.main,
								color: grey[50],
								marginBottom: '10px',
								fontWeight: '600',
								':hover': {
									backgroundColor: (theme) => theme.palette.secondary.main,
								},
							}}
						>
							{secondaryButtonText}
						</Button>
					)}
				</Box>
			</ModalWrapper>
		);
	}

	return null;
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

export default ModalAlert;
