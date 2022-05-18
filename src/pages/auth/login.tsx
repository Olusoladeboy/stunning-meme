import React from 'react';
import { Box } from '@mui/material';
import AuthContainer from '../../components/layout/auth';
import LoginForm from '../../components/forms/login-form';
import Image from '../../components/image';

const Login = () => {
	return (
		<AuthContainer>
			<Box>
				<Image
					sx={{
						maxWidth: '80%',
						margin: '0px auto 2rem',
						img: {
							width: '100%',
						},
					}}
					src={require('../../assets/images/app-logo-with-text.png')}
					alt={'Airtimeflip-logo'}
				/>
				<LoginForm />
			</Box>
		</AuthContainer>
	);
};

export default Login;
