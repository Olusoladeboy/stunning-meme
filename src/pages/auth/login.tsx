import React from 'react';
import { Box } from '@mui/material';
import { AuthLayout, LoginForm, Image } from 'components';

const Login = () => {
	return (
		<AuthLayout>
			<Box>
				<Image
					sx={{
						maxWidth: '80%',
						margin: '0px auto 2rem',
						img: {
							width: '100%',
						},
					}}
					src={require('assets/images/app-logo-with-text.png')}
					alt={'Airtimeflip-logo'}
				/>
				<LoginForm />
			</Box>
		</AuthLayout>
	);
};

export default Login;
