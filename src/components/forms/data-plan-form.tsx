import React, { CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import {
	DataPlan,
	QueryKeys,
	DATA_SOURCE,
	checkAmount,
	Amount,
} from 'utilities';
import Select from '../form-components/select';
import TextPlaceholder from '../partials/text-placeholder';
import { useAlert, useHandleError } from 'hooks';
import { createDataPlan, updateDataPlan } from 'api';

type Props = {
	dataPayload?: DataPlan;
	callback?: () => void;
};

const SELECT_DATA_SOURCE = 'Select data source';

const DataPlanForm = ({ dataPayload, callback }: Props) => {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const { dataType, network } = useParams();

	const validationSchema = yup.object().shape({
		name: yup.string().required('Enter name'),
		amount: yup
			.string()
			.matches(/^[1-9]\d*(\.\d+)?$/, 'Incorrect amount')
			.required('Enter amount'),
		merchant_amount: yup
			.string()
			.matches(/^[1-9]\d*(\.\d+)?$/, 'Incorrect amount')
			.required('Enter merchant amount'),
		data_source: yup
			.string()
			.notOneOf([SELECT_DATA_SOURCE], SELECT_DATA_SOURCE)
			.required(SELECT_DATA_SOURCE),
		code: yup.string().required('Enter code'),
		data_unit: yup
			.string()
			.matches(/\d/, 'Data unit must be a number')
			.required('Enter data unit'),
	});

	const initialValues: DataPlan = {
		name: '',
		amount: '',
		data_source: SELECT_DATA_SOURCE,
		code: '',
		merchant_amount: '',
		data_unit: '',
	};

	const { isLoading: isCreatingPlan, mutate: mutateCreatePlan } = useMutation(
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
					queryClient.invalidateQueries(QueryKeys.DataTypes);
				}
			},
		}
	);

	/*
	 *Update DataPlan Mutation
	 */
	const { isLoading: isUpdatingPlan, mutate: mutateUpdatePlan } = useMutation(
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

	const createOrUpdateDataPlan = (data: DataPlan) => {
		if (dataPayload && Object.keys(dataPayload).length > 0) {
			let payload: DataPlan = {
				name: data.name,
				amount: data.amount,
				merchant_amount: data.merchant_amount,
				data_unit: data.data_unit,
				code: data.code,
				data_source: data.data_source,
			};

			return mutateUpdatePlan({
				data: payload,
				id: dataPayload?.id as string,
			});
		}

		mutateCreatePlan({ ...data, network, dataType });
	};

	const { values, handleChange, errors, touched, handleSubmit, resetForm } =
		useFormik({
			initialValues: dataPayload
				? {
						...dataPayload,
						amount: checkAmount(dataPayload.amount as string | Amount),
						merchant_amount: checkAmount(
							dataPayload.merchant_amount as string | Amount
						),
				  }
				: initialValues,
			validationSchema,
			onSubmit: (values) => {
				createOrUpdateDataPlan(values);
			},
		});

	const { name, amount, code, merchant_amount, data_source, data_unit } =
		values;

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
						Merchant Plan Amount
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Merchant plan amount'}
						error={
							errors && touched.merchant_amount && errors.merchant_amount
								? true
								: false
						}
						helperText={
							errors && touched.merchant_amount && errors.merchant_amount
						}
						value={merchant_amount}
						onChange={handleChange('merchant_amount')}
					/>
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Unit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Data Unit'}
						error={
							errors && touched.data_unit && errors.data_unit ? true : false
						}
						helperText={errors && touched.data_unit && errors.data_unit}
						value={data_unit}
						onChange={handleChange('data_unit')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Data Code
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Data Code'}
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
						<TextPlaceholder text={data_source as string} hasArrowDropDown />
					) : (
						<Select
							fullWidth
							error={
								errors && touched.data_source && errors.data_source
									? true
									: false
							}
							helpertext={errors && touched.data_source && errors.data_source}
							value={data_source}
							onChange={handleChange('data_source') as never}
						>
							<MenuItem disabled value={SELECT_DATA_SOURCE}>
								{SELECT_DATA_SOURCE}
							</MenuItem>
							{Object.values(DATA_SOURCE).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					)}
				</Box>
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
