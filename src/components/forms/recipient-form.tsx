import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { QueryKeys, IRecipient } from 'utilities';
import { useAlert, useHandleError } from 'hooks';
import { createRecipient, sendRecipientOtp, updateRecipient } from 'api';

type Props = {
	dataPayload?: IRecipient;
	callback?: () => void;
};

const RecipientForm = ({ dataPayload, callback }: Props) => {
	const theme = useTheme();
	const routerParams = useParams();
	const network = routerParams?.network;
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);

	const [canCreateRecipient, setCanCreateRecipient] = useState<boolean>(false);

	const isEdit = useMemo(() => {
		if (
			dataPayload &&
			typeof dataPayload === 'object' &&
			Object.keys(dataPayload).length > 0
		)
			return true;
		return false;
	}, [dataPayload]);

	const validationSchema = yup.object().shape({
		phoneNumber: yup.string().required('Enter phone number'),
		alias: yup.string().required('Enter recipient alias'),
		targetBalance: yup
			.string()
			.matches(/^[1-9]\d*(\.\d+)?$/, 'Incorrect amount')
			.required('Enter target balance'),
		pin: yup.string().required('Enter share and sell pin'),
	});

	const extendValidationSchema = validationSchema.shape({
		otp: yup
			.string()
			.matches(/^[0-9]{6}$/, 'OTP must be a digit')
			.required('Enter OTP'),
	});

	const initialValues: Partial<IRecipient> = {
		phoneNumber: '',
		alias: '',
		networkName: network?.toUpperCase(),
		pin: '',
		targetBalance: '',
		otp: '',
	};

	const { isLoading: isCreatingRecipient, mutate: mutateCreateRecipient } =
		useMutation(createRecipient, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					typeof callback !== 'undefined' && callback();
					setAlert({
						message: data.message,
						type: 'success',
					});
					resetForm();
					queryClient.invalidateQueries(QueryKeys.AutoConversionRecipients);
				}
			},
		});

	const { isLoading: isSendingRecipientOtp, mutate: mutateSendRecipientOtp } =
		useMutation(sendRecipientOtp, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					setCanCreateRecipient(true);
				}
			},
		});

	/*
	 *Update Recipient Mutation
	 */
	const { isLoading: isUpdatingRecipient, mutate: mutateUpdateRecipient } =
		useMutation(updateRecipient, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					typeof callback !== 'undefined' && callback();
					setAlert({
						message: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeys.AutoConversionRecipients);
				}
			},
		});

	const createOrUpdateDataPlan = (values: typeof initialValues) => {
		if (
			dataPayload &&
			typeof dataPayload === 'object' &&
			Object.keys(dataPayload).length > 0
		) {
			let payload = {
				alias: values.alias,
				pin: values.pin,
				targetBalance: parseFloat(`${values.targetBalance}`),
			};

			return mutateUpdateRecipient({
				data: payload,
				id: dataPayload?.id as string,
			});
		}

		if (canCreateRecipient) {
			mutateCreateRecipient({
				...values,
				targetBalance: parseFloat(`${values.targetBalance}`),
			});
		} else {
			mutateSendRecipientOtp({
				phoneNumber: values.phoneNumber,
				networkName: values.networkName,
			});
		}
	};

	const {
		values,
		handleChange,
		errors,
		touched,
		handleSubmit,
		resetForm,
		setValues,
	} = useFormik({
		initialValues,
		validationSchema: canCreateRecipient
			? extendValidationSchema
			: validationSchema,
		onSubmit: (values) => {
			createOrUpdateDataPlan(values);
		},
	});

	useEffect(() => {
		if (
			dataPayload &&
			typeof dataPayload === 'object' &&
			Object.keys(dataPayload).length > 0
		) {
			setValues({
				phoneNumber: dataPayload.phoneNumber,
				alias: dataPayload.alias,
				networkName: dataPayload.networkName,
				pin: dataPayload.pin as string,
				targetBalance: dataPayload.targetBalance.toString(),
			});
		}
	}, [dataPayload, setValues]);

	const { phoneNumber, alias, pin, targetBalance, otp } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gap: theme.spacing(2),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Phone Number
					</Typography>

					<TextInput
						fullWidth
						disabled={isEdit || canCreateRecipient}
						error={
							errors && touched.phoneNumber && errors.phoneNumber ? true : false
						}
						helperText={errors && touched.phoneNumber && errors.phoneNumber}
						placeholder={'Phone Number'}
						value={phoneNumber}
						onChange={handleChange('phoneNumber')}
					/>
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Pin
					</Typography>

					<TextInput
						fullWidth
						disabled={canCreateRecipient}
						error={errors && touched.pin && errors.pin ? true : false}
						helperText={errors && touched.pin && errors.pin}
						placeholder={'Share and sell pin'}
						value={pin}
						onChange={handleChange('pin')}
					/>
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Alias
					</Typography>

					<TextInput
						fullWidth
						disabled={canCreateRecipient}
						error={errors && touched.alias && errors.alias ? true : false}
						helperText={errors && touched.alias && errors.alias}
						placeholder={'a.k.a for the number'}
						value={alias}
						onChange={handleChange('alias')}
					/>
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Target Balance
					</Typography>
					<TextInput
						fullWidth
						disabled={canCreateRecipient}
						placeholder={'Target balance'}
						error={
							errors && touched.targetBalance && errors.targetBalance
								? true
								: false
						}
						helperText={errors && touched.targetBalance && errors.targetBalance}
						value={targetBalance}
						onChange={handleChange('targetBalance')}
					/>
				</Box>
				{canCreateRecipient && (
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							OTP
						</Typography>
						<TextInput
							fullWidth
							placeholder={'Enter OTP'}
							error={errors && touched.otp && errors.otp ? true : false}
							helperText={errors && touched.otp && errors.otp}
							value={otp}
							onChange={handleChange('otp')}
						/>
					</Box>
				)}
			</Box>
			<Button
				loading={
					isCreatingRecipient || isUpdatingRecipient || isSendingRecipientOtp
				}
				style={styles.btn}
				type={'submit'}
				size={'large'}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				{isEdit || canCreateRecipient ? 'Save' : 'Send OTP'}
			</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},

	label: {
		display: 'block',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
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

export default RecipientForm;
