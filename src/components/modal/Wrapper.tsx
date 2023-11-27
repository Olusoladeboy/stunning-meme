import React, { ReactNode } from 'react';
import { Box, BoxProps, useTheme, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Props extends BoxProps {
	children: ReactNode;
	hasCloseButton?: boolean;
	closeModal?: () => void;
	title?: any;
	contentWidth?: string;
}

const ModalWrapper = ({
	children,
	hasCloseButton = true,
	closeModal,
	title,
	contentWidth,
	...rest
}: Props) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '0px',
				left: '0px',
				height: '100vh',
				width: '100%',
				backgroundColor: 'rgba(40, 83, 107, 0.7)',
				zIndex: theme.zIndex.modal,
				overflow: 'auto',
				padding: '15px',
			}}
		>
			<Box
				sx={{
					maxWidth: contentWidth || '640px',
					margin: '10rem auto',
					width: '100%',
					backgroundColor: 'background.paper',
					padding: { xs: '15px 20px', sm: '2rem', md: '3.5rem' },
					borderRadius: '5px',
					position: 'relative',
					...rest.sx,
				}}
			>
				{hasCloseButton && (
					<IconButton
						onClick={() => typeof closeModal !== 'undefined' && closeModal()}
						size={'small'}
						sx={{
							position: 'absolute',
							top: '-45px',
							right: '0px',
							backgroundColor: `${grey['400']} !important`,
							border: `1.5px solid ${grey['50']}`,
							color: theme.palette.primary.main,
							zIndex: theme.zIndex.modal + 1000,
						}}
					>
						<Close />
					</IconButton>
				)}
				{title && (
					<Box sx={{ marginBottom: theme.spacing(3) }}>
						{typeof title === 'string' ? (
							<Typography
								sx={{ fontWeight: 'bold', marginBottom: '20px' }}
								variant={'h6'}
							>
								{title}
							</Typography>
						) : (
							<Box sx={{ marginBottom: '20px' }}>{title}</Box>
						)}
					</Box>
				)}
				{children}
			</Box>
		</Box>
	);
};

export default ModalWrapper;
