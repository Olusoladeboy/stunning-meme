import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import Button from '../button';
import { grey } from '@mui/material/colors';
import ModalWrapper from './Wrapper';

type Props = {
	alertType?: 'success' | 'failed';
	successType?: 'green' | 'primary';
	description?: string;
	title: string;
	message?: string;
	btnText?: string;
	handlePress?: () => void;
	isFailed?: boolean;
	handleTryAgain?: () => void;
	handleGoback?: () => void;
	isDisplayAdditionalBtn?: boolean;
	isCopy?: boolean;
};

const SuccessModal = ({
	alertType = 'success',
	successType = 'primary',
	title,
	message,
	description,
	handlePress,
	handleGoback,
	handleTryAgain,
	isDisplayAdditionalBtn,
	isCopy,
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
					{alertType ? (
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

				{isCopy && (
					<Box width={'100%'}>
						<Typography sx={{ marginBottom: '8px' }} variant={'body1'}>
							{description}
						</Typography>
						<Button
							onClick={() =>
								typeof handleTryAgain !== 'undefined' && handleTryAgain()
							}
							fullWidth
							size={'large'}
							sx={{
								border: `1px solid ${theme.palette.primary.main}`,
								padding: '12px 20px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								color: theme.palette.primary.main,
								fontWeight: '600',
							}}
						>
							<Typography>Code</Typography>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<ContentCopy sx={{ fontSize: '16px', marginRight: '5px' }} />
								<Typography>copy</Typography>
							</Box>
						</Button>
					</Box>
				)}

				<Box width={'100%'}>
					<Button
						onClick={() =>
							typeof handleGoback !== 'undefined' && handleGoback()
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
						Go back to dashboard
					</Button>
					{isDisplayAdditionalBtn && (
						<Button
							onClick={() =>
								typeof handleTryAgain !== 'undefined' && handleTryAgain()
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
							See my point balance
						</Button>
					)}
				</Box>
			</Box>
		</ModalWrapper>
	);
};

export default SuccessModal;
