import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import { LINKS, Storage, StorageKeys } from 'utilities';
import * as yup from 'yup';
import CustomButton from '../button/custom-button';
import { useModalAlert, useVerifySetup2fa } from 'hooks';

const Setup2faForm = () => {
	const theme = useTheme();
	const { state }: any = useLocation();
	const styles = useStyles(theme);
	const navigate = useNavigate();
	const modal = useModalAlert();

	const qrCodeUrl = useMemo(() => {
		if (state?.otpauthUrl) return state?.otpauthUrl;

		return '';
	}, [state]);

	const preAuthTokenRef = useRef<string>(
		Storage.getItem(StorageKeys.PreAuthToken) || '',
	);

	const validationSchema = yup.object().shape({
		code: yup
			.string()
			.required('Verification code is required')
			.matches(/^[0-9]{6}$/, 'Code must be exactly 6 digits'),
	});

	const initialValues = {
		code: '',
	};

	const onSessionTimeOut = () => {
		modal({
			title: 'Account Setup',
			message:
				'The setup session has expired. Please restart the 2FA setup process.',
			primaryButtonText: 'Re-start',
			onClickPrimaryButton: async () => {
				navigate(LINKS.Login);
				modal(null);
			},
		});
	};

	useEffect(() => {
		const TIMEOUT_DURATION = 900000;

		const timer = setTimeout(() => {
			console.log('15 minutes passed! Running action...');
			onSessionTimeOut();
			Storage.deleteItem(StorageKeys.PreAuthToken);
		}, TIMEOUT_DURATION);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const { isVerifying2faSetup, verify2faSetup } = useVerifySetup2fa({
		callback: (res) => {
			if (res?.success && res.data) {
				const preAuthToken = res.data.payload.preAuthToken;
				const message = res.data.payload.message;

				Storage.saveItem(StorageKeys.PreAuthToken, preAuthToken);
				preAuthTokenRef.current = preAuthToken;

				modal({
					message,
					title: 'Account Setup',
					primaryButtonText: 'Continue',
					onClickPrimaryButton: async () => {
						navigate(LINKS.Auth2faVerifyCode, {
							state: {
								preAuthToken,
							},
						});
						modal(null);
					},
				});
			}
		},
	});

	const { handleChange, errors, touched, values, handleSubmit } = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const email = Storage.getItem(StorageKeys.UserEmail);
			if (preAuthTokenRef.current && email) {
				const payload = {
					email,
					preAuthToken: preAuthTokenRef.current,
					code: values.code,
				};
				verify2faSetup(payload);
			}
		},
	});

	const { code } = values;

	return (
		<Box style={styles.form as any} component={'form'}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					maxWidth: '200px',
					margin: '0px auto 20px',
					img: {
						width: '100%',
					},
				}}
			>
				<QRCode value={qrCodeUrl} />
			</Box>

			<Box>
				<TextInput
					fullWidth
					error={errors && touched.code && errors.code ? true : false}
					helperText={errors && touched.code && errors.code}
					placeholder={'Enter your one-time code'}
					value={code}
					onChange={handleChange('code')}
				/>
			</Box>

			<CustomButton
				loading={isVerifying2faSetup}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={styles.btn}
				size={'large'}
				type={'submit'}
			>
				Continue
			</CustomButton>
		</Box>
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

export default Setup2faForm;
