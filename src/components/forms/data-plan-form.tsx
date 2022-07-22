import React, { CSSProperties, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import { DataPlan, DataPlanType } from '../../utilities/types';
import Select from '../form-components/Select';
import Api from '../../utilities/api';
import handleResponse from '../../utilities/helpers/handleResponse';
import { QueryKeyTypes } from '../../utilities/types';
import { useAppSelector } from '../../store/hooks';
import TextPlaceholder from '../partials/text-placeholder';

interface ExtendedDataType extends DataPlan {
	id: string;
}

type Props = {
	dataPayload?: ExtendedDataType;
	handleOnSubmit?: () => void;
};

const SELECT_PLAN = 'Select plan';

const DataPlanForm = ({ dataPayload, handleOnSubmit }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const params = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [dataPlanType, setDataPlanType] = useState('');
	const { token } = useAppSelector((store) => store.authState);

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
		Api.DataPlan.CreatePlan,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					typeof handleOnSubmit !== 'undefined' && handleOnSubmit();
					enqueueSnackbar(data.message, { variant: 'success' });
					resetForm();
					queryClient.invalidateQueries(QueryKeyTypes.DataPlans);
				}
			},
		}
	);

	const { isLoading: isUpdatingPlan, mutate: updatePlan } = useMutation(
		Api.DataPlan.UpdatePlan,
		{
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					typeof handleOnSubmit !== 'undefined' && handleOnSubmit();
					enqueueSnackbar(data.message, { variant: 'success' });
					queryClient.invalidateQueries(QueryKeyTypes.DataPlans);
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
				token: token || '',
				data:
					data.type === DataPlanType.SMS
						? {
								...updataDataPlan,
								shortcode: data.shortcode,
								shortcode_sms: data.shortcode_sms,
						  }
						: updataDataPlan,
				id: dataPayload.id,
			});
		} else {
			createPlan({
				token: token || '',
				data: data.type === DataPlanType.SMS ? data : createPlanData,
			});
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
						Data type
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
						Plan Code
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
				buttonProps={{
					style: styles.btn,
					size: 'large',
					type: 'submit',
					onClick: (e) => {
						e.preventDefault();
						handleSubmit();
					},
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
