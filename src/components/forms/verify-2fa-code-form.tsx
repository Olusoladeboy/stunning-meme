import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import { LINKS, LoginData, validationSchema } from 'utilities';
import { useAppDispatch } from 'store/hooks';
import { setToken, setUser } from 'store/auth';
import CustomButton from '../button/custom-button';
import { useAlert, useHandleError, useModalAlert } from 'hooks';
import { login } from 'api';

const Verify2faCodeForm = () => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const modal = useModalAlert();

	const initialValues: LoginData = {
		email: '',
		password: '',
	};

	const { isLoading, mutate } = useMutation(login, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				const user = data.payload.user;
				const token = data.payload.token;
				const userName = `${user.firstname} ${user.lastname}`;
				dispatch(setToken(token));
				dispatch(setUser(user));
				if (
					// user.defaultPasswordChanged &&
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

	const { handleChange, errors, touched, values, handleSubmit } = useFormik({
		initialValues,
		validationSchema: validationSchema.Login,
		onSubmit: (values) => {
			mutate(values);
		},
	});

	const { email } = values;

	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<TextInput
					fullWidth
					error={errors && touched.email && errors.email ? true : false}
					helperText={errors && touched.email && errors.email}
					placeholder={'Enter code'}
					value={email}
					onChange={handleChange('email')}
				/>
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
