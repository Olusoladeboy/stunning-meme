import React from 'react';
import { Box, Typography } from '@mui/material';
import { AuthLayout, Image, Setup2faForm } from 'components';
import { usePageTitle } from 'hooks';

const TwoFactorSetup = () => {
	usePageTitle('Login');
	return (
		<AuthLayout>
			<Box>
				<Box
					sx={{
						marginBottom: ['40px'],
					}}
				>
					<Image
						sx={{
							maxWidth: '70%',
							margin: '0px auto 2rem',
							img: {
								width: '100%',
							},
						}}
						src={require('assets/images/app-logo-with-text.png')}
						alt={'Airtimeflip-logo'}
					/>
					<Typography
						sx={{ marginBottom: ['20px'], textAlign: 'center' }}
						variant='h1'
					>
						Secure your account
					</Typography>
					<Typography
						variant='body1'
						sx={{
							textAlign: 'center',
						}}
					>
						Scan the QR Code below using your preferred authenticator app and
						then enter the provided one-time code below.
					</Typography>
				</Box>
				<Setup2faForm />
			</Box>
		</AuthLayout>
	);
};

export default TwoFactorSetup;
