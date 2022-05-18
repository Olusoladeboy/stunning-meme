import React, { ReactNode } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { SECOUNDARY_COLOR } from '../../utilities/constant';
import { grey } from '@mui/material/colors';

type Props = {
	children: ReactNode;
};

const AuthContainer = ({ children }: Props) => {
	const theme = useTheme();
	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					gap: '6rem',
					minHeight: '100vh',
					flexDirection: 'column',
					alignItems: 'center',
					padding: `${theme.spacing(4)} 0px`,
				}}
			>
				<Box
					sx={{
						width: '100%',
						maxWidth: '800px',
						margin: 'auto',
						flex: '1',
						border: `1px solid ${SECOUNDARY_COLOR}`,
						backgroundColor: grey[50],
						boxShadow: `0px 0px 8px rgba(0, 0, 0, 0.2)`,
						borderRadius: theme.spacing(3),
						padding: `4rem ${theme.spacing(3)}`,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Box sx={{ maxWidth: '420px', width: '100%', margin: 'auto' }}>
						{children}
					</Box>
				</Box>
				<Typography variant={'body1'}>
					© 2020 AirtimeFlip Technology LTD - RC 1621037
				</Typography>
			</Box>
		</Container>
	);
};

export default AuthContainer;
