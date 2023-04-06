import React, { CSSProperties, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { DataPlan, DataPlanType, QueryKeys } from '../../utilities';
import Select from '../form-components/Select';
import TextPlaceholder from '../partials/text-placeholder';
import { useAlert, useHandleError } from '../../hooks';
import { createDataPlan, updateDataPlan } from '../../api';

type Props = {
	dataPayload?: DataPlan;
	callback?: () => void;
};

const SELECT_PLAN = 'Select plan';

const DataPlanForm = ({ dataPayload, callback }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const params = useParams();
	const [dataPlanType, setDataPlanType] = useState('');

	const validationSchema = yup.object().shape({
		name: yup.string().required('Enter name'),
		amount: yup.string().required('Enter amount'),
		type: yup
			.string()
			.notOneOf([SELECT_PLAN], 'Select a plan')
			.required('Select plan'),
		code: yup.string().required('Enter code'),
	});

	const validationSchemaForTypeSms = yup.object().shape({
		name: yup.string().required('Enter name'),
		amount: yup.string().required('Enter amount'),
		type: yup
			.string()
			.notOneOf([SELECT_PLAN], 'Select a plan')
			.required('Select plan'),
		code: yup.string().required('Enter code'),
		shortcode: yup.string().required('Enter short code'),
		shortcode_sms: yup.string().required('Enter short code sms'),
	});

	const queryClient = useQueryClient();

	const { isLoading: isCreatingPlan, mutate: createPlan } = useMutation(
		createDataPlan,
		{
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
					queryClient.invalidateQueries(QueryKeys.DataPlans);
				}
			},
		}
	);

	const { isLoading: isUpdatingPlan, mutate: updatePlan } = useMutation(
		updateDataPlan,
		{
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
					queryClient.invalidateQueries(QueryKeys.DataPlans);
				}
			},
		}
	);

	const filterAndMutateData = (data: DataPlan) => {
		const amount =
			typeof dataPayload?.amount !== 'string'
				? dataPayload?.amount.$numberDecimal
				: dataPayload?.amount;

		const updataDataPlan: DataPlan = {
			type: data.type,
			code: data.code,
			amount: amount || '',
		};

		const createPlanData: DataPlan = {
			name: data.name,
			type: data.type,
			code: data.code,
			amount: data.amount,
			network: data.network,
		};

		if (dataPayload && Object.keys(dataPayload).length > 0) {
			updatePlan({
				data:
					data.type === DataPlanType.SMS
						? {
								...updataDataPlan,
								shortcode: data.shortcode,
								shortcode_sms: data.shortcode_sms,
						  }
						: updataDataPlan,
				id: dataPayload?.id as string,
			});
		} else {
			createPlan(data.type === DataPlanType.SMS ? data : createPlanData);
		}
	};

	const initialValues: DataPlan = {
		name: '',
		network: params.id as string,
		amount: '',
		type: SELECT_PLAN,
		code: '',
		shortcode: '',
		shortcode_sms: '',
	};

	const {
		values,
		handleChange,
		errors,
		touched,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues: dataPayload
			? {
					...dataPayload,
					amount:
						typeof dataPayload.amount !== 'string'
							? dataPayload.amount.$numberDecimal
							: dataPayload.amount,
			  }
			: initialValues,
		validationSchema:
			dataPlanType === DataPlanType.SMS
				? validationSchemaForTypeSms
				: validationSchema,
		onSubmit: (values) => {
			filterAndMutateData(values);
		},
	});

	const { name, amount, type, code, shortcode, shortcode_sms } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'repeat(2, 1fr)',
					},
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Name
					</Typography>
					{dataPayload && Object.keys(dataPayload).length > 0 ? (
						<TextPlaceholder text={name || ''} />
					) : (
						<TextInput
							fullWidth
							error={errors && touched.name && errors.name ? true : false}
							helperText={errors && touched.name && errors.name}
							placeholder={'Data name'}
							value={name}
							onChange={handleChange('name')}
						/>
					)}
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Plan Amount
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Plan amount'}
						error={errors && touched.amount && errors.amount ? true : false}
						helperText={errors && touched.amount && errors.amount}
						value={amount}
						onChange={handleChange('amount')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Merchant Amount
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Merchant Amount'}
						error={errors && touched.code && errors.code ? true : false}
						helperText={errors && touched.code && errors.code}
						value={code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Unit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Data Unit'}
						error={errors && touched.code && errors.code ? true : false}
						helperText={errors && touched.code && errors.code}
						value={code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Code
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Plan Code'}
						error={errors && touched.code && errors.code ? true : false}
						helperText={errors && touched.code && errors.code}
						value={code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Source
					</Typography>
					{dataPayload && Object.keys(dataPayload).length > 0 ? (
						<TextPlaceholder text={type} hasArrowDropDown />
					) : (
						<Select
							fullWidth
							error={errors && touched.type && errors.type ? true : false}
							helpertext={errors && touched.type && errors.type}
							value={type}
							onChange={(e: any) => {
								const value = e.target.value;
								setDataPlanType(value);
								setFieldValue('type', value);
							}}
						>
							<MenuItem disabled value={SELECT_PLAN}>
								{SELECT_PLAN}
							</MenuItem>
							<MenuItem value={DataPlanType.USSD}>{DataPlanType.USSD}</MenuItem>
							<MenuItem value={DataPlanType.SMS}>{DataPlanType.SMS}</MenuItem>

							<MenuItem value={DataPlanType.MANUAL}>
								{DataPlanType.MANUAL}
							</MenuItem>
							<MenuItem value={DataPlanType.KETTLESUB}>
								{DataPlanType.KETTLESUB}
							</MenuItem>
						</Select>
					)}
				</Box>
				{type === DataPlanType.SMS && (
					<>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Shortcode
							</Typography>
							<TextInput
								fullWidth
								placeholder={'Shortcode'}
								error={
									errors && touched.shortcode && errors.shortcode ? true : false
								}
								helperText={errors && touched.shortcode && errors.shortcode}
								value={shortcode}
								onChange={handleChange('shortcode')}
							/>
						</Box>
						<Box>
							<Typography variant={'body1'} style={styles.label}>
								Shortcode sms
							</Typography>
							<TextInput
								fullWidth
								placeholder={'Shortcode sms'}
								error={
									errors && touched.shortcode_sms && errors.shortcode_sms
										? true
										: false
								}
								helperText={
									errors && touched.shortcode_sms && errors.shortcode_sms
								}
								value={shortcode_sms}
								onChange={handleChange('shortcode_sms')}
							/>
						</Box>
					</>
				)}
			</Box>
			<Button
				loading={isCreatingPlan || isUpdatingPlan}
				style={styles.btn}
				type={'submit'}
				size={'large'}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				Save
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

export default DataPlanForm;
