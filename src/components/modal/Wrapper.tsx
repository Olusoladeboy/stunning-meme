import React, { ReactNode } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

type Props = {
	children: ReactNode;
	title?: ReactNode;
	close?: () => void;
	contentWidth?: string;
};

const ModalWrapper = ({ children, title, close, contentWidth }: Props) => {
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
			}}
		>
			<Box
				sx={{
					maxWidth: contentWidth || '680px',
					position: 'relative',
					margin: '10rem auto',
					width: '100%',
					backgroundColor: grey[200],
					padding: '15px',
					borderRadius: '5px',
				}}
			>
				<Box>
					{title && typeof title === 'string' ? (
						<Typography variant={'h5'}>{title}</Typography>
					) : (
						<>{title}</>
					)}
					<IconButton
						onClick={() => typeof close !== 'undefined' && close()}
						sx={{ position: 'absolute', right: '15px', top: '10px' }}
					>
						<Close />
					</IconButton>
				</Box>
				<Box sx={{ marginTop: (theme) => theme.spacing(4) }}>{children}</Box>
			</Box>
		</Box>
	);
};

export default ModalWrapper;
