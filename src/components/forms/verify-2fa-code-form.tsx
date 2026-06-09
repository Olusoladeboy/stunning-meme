import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import * as yup from 'yup';
import { grey } from '@mui/material/colors';
import { LINKS, Storage, StorageKeys } from 'utilities';
import CustomButton from '../button/custom-button';
import { use2faLogin, useAlert, useModalAlert } from 'hooks';
import { useAppDispatch } from 'store/hooks';
import { setToken, setUser } from 'store/auth';

interface LocationState {
	preAuthToken?: string;
}

const Verify2faCodeForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const modal = useModalAlert();
	const setAlert = useAlert();

	const navigate = useNavigate();

	const location = useLocation();
	const state = location?.state as LocationState;

	const preAuthToken =
		state?.preAuthToken || Storage.getItem(StorageKeys.PreAuthToken);
	const email = Storage.getItem(StorageKeys.UserEmail);

	const { isLogining, login } = use2faLogin({
		callback: (res) => {
			if (res?.success && res.data) {
				const token = res.data.payload.token;
				const user = res.data.payload.user;

				const userName = `${user.firstname} ${user.lastname}`;

				dispatch(setToken(token));
				dispatch(setUser(user));

				if (
					'defaultPasswordChanged' in user &&
					!Boolean(user.defaultPasswordChanged)
				) {
					modal({
						title: 'Change Password',
						message: 'Kindly change your password',
						type: 'error',
						primaryButtonText: 'Change Password',
						onClickPrimaryButton: () => {
							modal(null);
							navigate(LINKS.ChangePassword);
						},
					});

					return;
				}

				navigate(LINKS.Dashboard);

				setAlert({ message: `Welcome back ${userName}!`, type: 'success' });
			}
		},
	});

	const validationSchema = yup.object().shape({
		code: yup
			.string()
			.required('Verification code is required')
			.matches(/^[0-9]{6}$/, 'Code must be exactly 6 digits'),
	});

	const initialValues = {
		code: '',
	};

	const { handleChange, errors, touched, values, handleSubmit } = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (preAuthToken && email) {
				const payload = {
					email,
					preAuthToken,
					code: values.code,
				};
				login(payload);
			}
		},
	});

	const { code } = values;

	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<TextInput
					fullWidth
					error={errors && touched.code && errors.code ? true : false}
					helperText={errors && touched.code && errors.code}
					placeholder={'Enter code'}
					value={code}
					onChange={handleChange('code')}
				/>
			</Box>

			<CustomButton
				loading={isLogining}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={styles.btn}
				size={'large'}
				type={'submit'}
			>
				Verify
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

export default Verify2faCodeForm;
