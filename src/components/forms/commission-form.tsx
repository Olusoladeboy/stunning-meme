import React, { CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { DataPlan, QueryKeys, TRANSACTION_SERVICE } from 'utilities';
import Select from '../form-components/select';
import { useAlert, useHandleError } from 'hooks';
import { createBusinessCommissions } from 'api';

type Props = {
	dataPayload?: DataPlan;
	callback?: () => void;
};

const SELECT_SERVICE_TYPE = 'Select service type';

const CommissionForm = ({ dataPayload, callback }: Props) => {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const { id } = useParams();

	const validationSchema = yup.object().shape({
		serviceType: yup
			.string()
			.notOneOf([SELECT_SERVICE_TYPE], SELECT_SERVICE_TYPE)
			.required(SELECT_SERVICE_TYPE),
		commissionRate: yup
			.string()
			.matches(/\d/, 'Data unit must be a number')
			.required('Enter data unit'),
	});

	const initialValues = {
		serviceType: SELECT_SERVICE_TYPE,
		commissionRate: '',
	};

	const { isLoading: isCreating, mutate: mutateCreate } = useMutation(
		createBusinessCommissions,
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
					queryClient.invalidateQueries(QueryKeys.Commissions);
					setAlert({
						message: data.message,
						type: 'success',
					});
					resetForm();
				}
			},
		}
	);

	const { values, handleChange, errors, touched, handleSubmit, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: (values) => {
				if (!id) {
					return setAlert({
						type: 'error',
						message:
							'Something went wrong, unable to create business commission',
					});
				}
				const commissionRate = Number(values.commissionRate) / 100;
				const payload = {
					...values,
					businessId: id,
					commissionRate,
				};
				mutateCreate(payload);
			},
		});

	const { serviceType, commissionRate } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: ['1fr'],
					gap: theme.spacing(3),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Service Type
					</Typography>
					<Select
						fullWidth
						error={Boolean(touched.serviceType && errors.serviceType)}
						helpertext={touched.serviceType ? errors.serviceType : undefined}
						value={serviceType}
						onChange={handleChange('serviceType') as never}
					>
						<MenuItem disabled value={SELECT_SERVICE_TYPE}>
							{SELECT_SERVICE_TYPE}
						</MenuItem>
						{Object.values(TRANSACTION_SERVICE).map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Rate
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Data Code'}
						error={Boolean(touched.commissionRate && errors.commissionRate)}
						helperText={
							touched.commissionRate ? errors.commissionRate : undefined
						}
						value={commissionRate}
						onChange={handleChange('commissionRate')}
					/>
				</Box>
			</Box>
			<Button
				loading={isCreating}
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

export default CommissionForm;
