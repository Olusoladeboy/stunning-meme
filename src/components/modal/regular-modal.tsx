import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Button from '../button';
import { grey } from '@mui/material/colors';
import ModalWrapper from './Wrapper';

type Props = {
	alertType?: 'success' | 'failed';
	successType?: 'green' | 'primary';
	title: string;
	message?: string;
	btnText?: string;
	handlePress?: () => void;
	isFailed?: boolean;
	handlePressOnFail?: () => void;
	handleContactUs?: () => void;
};

const RegularModal = ({
	alertType = 'success',
	successType = 'primary',
	title,
	message,
	btnText = 'Ok',
	handlePress,
	isFailed,
	handleContactUs,
	handlePressOnFail,
}: Props) => {
	const theme = useTheme();
	return (
		<ModalWrapper>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				<Box
					sx={{
						maxWidth: '80px',
						img: {
							width: '100%',
						},
					}}
				>
					{alertType === 'success' ? (
						<>
							{successType === 'green' ? (
								<img
									src={require('../../assets/icons/check-green.png')}
									alt={'success-green'}
								/>
							) : (
								<img
									src={require('../../assets/icons/check-primary.png')}
									alt={'success-green'}
								/>
							)}
						</>
					) : (
						<img
							src={require('../../assets/icons/failed.png')}
							alt={'success-green'}
						/>
					)}
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						sx={{ fontWeight: '600', fontSize: '20px' }}
						variant={'body1'}
					>
						{title}
					</Typography>
					<Typography variant={'body1'}>{message}</Typography>
				</Box>

				{isFailed ? (
					<Box width={'100%'}>
						<Button
							onClick={() =>
								typeof handleContactUs !== 'undefined' && handleContactUs()
							}
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
							Contact us
						</Button>
						<Button
							onClick={() =>
								typeof handlePress !== 'undefined' && handlePress()
							}
							fullWidth
							size={'large'}
							sx={{
								border: `1px solid ${theme.palette.secondary.main}`,
								color: theme.palette.secondary.main,
								fontWeight: '600',
								':hover': {
									backgroundColor: theme.palette.secondary.main,
									color: grey[50],
								},
							}}
						>
							{btnText || 'Try again'}
						</Button>
					</Box>
				) : (
					<Button
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
						{btnText}
					</Button>
				)}
			</Box>
		</ModalWrapper>
	);
};

export default RegularModal;
