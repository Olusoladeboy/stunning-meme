import React, { useRef, useState } from 'react';
import { Box, useTheme, InputAdornment, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Link from '../link';
import {
	IModalAlert,
	LINKS,
	LoginData,
	Storage,
	StorageKeys,
	validationSchema,
} from 'utilities';
import CustomButton from '../button/custom-button';
import { useAlert, useHandleError, useModalAlert, useSetup2fa } from 'hooks';
import { login } from 'api';
import Loader from 'components/loader';

const LoginForm = () => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const [isDisplayPassword, setDisplayPassword] = useState<boolean>(false);
	const navigate = useNavigate();
	const modal = useModalAlert();

	const { setup2fa, isSettingup2fa } = useSetup2fa({
		callback: (res) => {
			if (res?.success && res.data) {
				const otpauthUrl = res.data.payload.otpauthUrl;
				const manualEntryKey = res.data.payload.manualEntryKey;

				navigate(LINKS.Auth2faSetup, {
					state: {
						otpauthUrl,
						manualEntryKey,
					},
				});
			}
		},
	});

	const initialValues: LoginData = {
		email: '',
		password: '',
	};

	const { isLoading, mutate } = useMutation(login, {
		onSettled: (data, error, variables) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				const googleAuthenticator2FA = data.payload.googleAuthenticator2FA;
				const googleAuthenticator2FASetupRequired =
					data.payload.googleAuthenticator2FASetupRequired;

				console.log('DATA::', data);

				const preAuthToken = data.payload.preAuthToken;

				Storage.saveItem(StorageKeys.PreAuthToken, preAuthToken);
				Storage.saveItem(StorageKeys.UserEmail, variables.email);

				setTimeout(() => {
					Storage.deleteItem(StorageKeys.PreAuthToken);
				}, 900000);

				const email = variables.email as string;

				if (googleAuthenticator2FASetupRequired) {
					const message =
						data.payload.message ||
						'Google Authenticator setup is required before you can access the admin console';

					const modalData: IModalAlert = {
						title: 'Account Setup',
						message,
						type: 'verify',
						primaryButtonText: 'Set up account',
						onClickPrimaryButton: async () => {
							setup2fa({
								email,
								preAuthToken,
							});
							modal(null);
						},
					};

					modal(modalData);

					return;
				}

				if (googleAuthenticator2FA) {
					const message =
						data.payload.message ||
						'Kindly input the code from your Google Authenticator app';

					const modalData: IModalAlert = {
						title: 'Verify Code',
						message,
						type: 'verify',
						primaryButtonText: 'Continue',
						onClickPrimaryButton: async () => {
							navigate(LINKS.Auth2faVerifyCode, {
								state: {
									email,
									preAuthToken,
								},
							});
							modal(null);
						},
					};

					modal(modalData);

					return;
				}
			}
		},
	});

	const { handleChange, errors, touched, values, handleSubmit } = useFormik({
		initialValues,
		validationSchema: validationSchema.Login,
		onSubmit: (values) => {
			mutate(values);
		},
	});

	const { password, email } = values;

	return (
		<>
			{isSettingup2fa && <Loader />}
			<Box style={styles.form as any} component={'form'}>
				<Box>
					<TextInput
						fullWidth
						error={errors && touched.email && errors.email ? true : false}
						helperText={errors && touched.email && errors.email}
						placeholder={'Email'}
						value={email}
						onChange={handleChange('email')}
					/>
				</Box>

				<Box>
					<TextInput
						fullWidth
						error={errors && touched.password && errors.password ? true : false}
						helperText={errors && touched.password && errors.password}
						placeholder={'Password'}
						value={password}
						onChange={handleChange('password')}
						type={isDisplayPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='start'>
									<Button
										onClick={() => setDisplayPassword(!isDisplayPassword)}
										disableRipple
										style={styles.endAdornmentBtn}
									>
										{isDisplayPassword ? 'hide' : 'show'}
									</Button>
								</InputAdornment>
							),
						}}
					/>
				</Box>

				<Box>
					<Link to={LINKS.ForgetPassword}>
						<Typography style={styles.link}>Forget Password?</Typography>
					</Link>
				</Box>

				<CustomButton
					loading={isLoading && isLoading}
					onClick={(e: React.FormEvent<HTMLButtonElement>) => {
						e.preventDefault();
						handleSubmit();
					}}
					style={styles.btn}
					size={'large'}
					type={'submit'}
				>
					Login
				</CustomButton>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
	},
	endAdornmentBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
	link: {
		color: theme.palette.secondary.main,
	},
});

export default LoginForm;
