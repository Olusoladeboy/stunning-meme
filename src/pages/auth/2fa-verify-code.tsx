import { Box, Typography } from '@mui/material';
import { AuthLayout, Image, Verify2faCodeForm } from 'components';
import { usePageTitle } from 'hooks';

const TwoFactorVerifyCode = () => {
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
						variant='h2'
					>
						Verify with Authenticator
					</Typography>
					<Typography
						variant='body1'
						sx={{
							textAlign: 'center',
						}}
					>
						Enter the temporary code generated in your Authenticator app
					</Typography>
				</Box>
				<Verify2faCodeForm />
			</Box>
		</AuthLayout>
	);
};

export default TwoFactorVerifyCode;
