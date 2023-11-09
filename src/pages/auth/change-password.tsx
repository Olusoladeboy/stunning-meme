import React from 'react';
import { AuthLayout, Image } from 'components';
import ChangePasswordForm from 'components/forms/change-password-form';
import { Typography } from '@mui/material';
import { usePageTitle } from 'hooks';

const ChangePassword = () => {
	usePageTitle('Change Password');
	return (
		<AuthLayout>
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
			<Typography
				sx={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold' }}
				variant={'h5'}
			>
				Change Password
			</Typography>
			<ChangePasswordForm />
		</AuthLayout>
	);
};

export default ChangePassword;
