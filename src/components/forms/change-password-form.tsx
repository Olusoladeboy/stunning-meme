import React, { useState } from 'react';
import { Box, useTheme, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import { LINKS, PASSWORD_REX, QueryKeys } from '../../utilities';
import CustomButton from '../button/custom-button';
import { useAlert, useHandleError, useModalAlert } from '../../hooks';
import { resetPassword } from '../../api';

interface InitialValues {
	newPassword: string;
	oldPassword: string;
	confirmPassword?: string;
}

const ChangePasswordForm = () => {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const [isDisplayOldPassword, setDisplayOldPassword] =
		useState<boolean>(false);
	const [isDisplayConfirmPassword, setDisplayConfirmPassword] =
		useState<boolean>(false);
	const [isDisplayNewPassword, setDisplayNewPassword] =
		useState<boolean>(false);
	const navigate = useNavigate();
	const modal = useModalAlert();

	const validationSchema = yup.object().shape({
		oldPassword: yup.string().required('Enter old password'),
		newPassword: yup
			.string()
			.matches(
				PASSWORD_REX,
				'Password must be at least 8 characters, one uppercase letter, one special charater, one number.'
			)
			.required('Enter your password'),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('newPassword')], 'Password do not match')
			.required('Enter confirm password'),
	});

	const initialValues: InitialValues = {
		newPassword: '',
		oldPassword: '',
		confirmPassword: '',
	};

	const { isLoading, mutate } = useMutation(resetPassword, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				queryClient.invalidateQueries(QueryKeys.LoginUserDetails);
				modal({
					title: 'Change Password',
					message: 'Password change successfully!',
					type: 'success',
					primaryButtonText: 'Go to Dashboard',
					onClickPrimaryButton: () => {
						modal(null);
						navigate(LINKS.Dashboard);
					},
				});
			}
		},
	});

	const { handleChange, errors, touched, values, handleSubmit } = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const data = {
				newPassword: values.newPassword,
				oldPassword: values.oldPassword,
			} as typeof initialValues;
			mutate(data);
		},
	});

	const { newPassword, oldPassword, confirmPassword } = values;

	console.log(errors);

	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<TextInput
					fullWidth
					error={
						errors && touched.oldPassword && errors.oldPassword ? true : false
					}
					helperText={errors && touched.oldPassword && errors.oldPassword}
					placeholder={'oldPassword'}
					value={oldPassword}
					onChange={handleChange('oldPassword')}
					type={isDisplayOldPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<Button
									onClick={() => setDisplayOldPassword(!isDisplayOldPassword)}
									disableRipple
									style={styles.endAdornmentBtn}
								>
									{isDisplayOldPassword ? 'hide' : 'show'}
								</Button>
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box>
				<TextInput
					fullWidth
					error={
						errors && touched.newPassword && errors.newPassword ? true : false
					}
					helperText={errors && touched.newPassword && errors.newPassword}
					placeholder={'New Password'}
					value={newPassword}
					onChange={handleChange('newPassword')}
					type={isDisplayNewPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<Button
									onClick={() => setDisplayNewPassword(!isDisplayNewPassword)}
									disableRipple
									style={styles.endAdornmentBtn}
								>
									{isDisplayNewPassword ? 'hide' : 'show'}
								</Button>
							</InputAdornment>
						),
					}}
				/>
			</Box>

			{PASSWORD_REX.test(newPassword) && (
				<Box>
					<TextInput
						fullWidth
						error={
							errors && touched.confirmPassword && errors.confirmPassword
								? true
								: false
						}
						helperText={
							errors && touched.confirmPassword && errors.confirmPassword
						}
						placeholder={'Confirm Password'}
						value={confirmPassword}
						onChange={handleChange('confirmPassword')}
						type={isDisplayConfirmPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='start'>
									<Button
										onClick={() =>
											setDisplayConfirmPassword(!isDisplayConfirmPassword)
										}
										disableRipple
										style={styles.endAdornmentBtn}
									>
										{isDisplayConfirmPassword ? 'hide' : 'show'}
									</Button>
								</InputAdornment>
							),
						}}
					/>
				</Box>
			)}

			<CustomButton
				loading={isLoading}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={styles.btn}
				size={'large'}
				type={'submit'}
			>
				Submit
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

export default ChangePasswordForm;
