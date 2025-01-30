import React, { CSSProperties, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import Button from '../button/custom-button';
import { IBusiness, QueryKeys } from 'utilities';
import Select from '../form-components/select';
import { useAlert, useHandleError } from 'hooks';
import { updateBusiness } from 'api';

type Props = {
	formData?: IBusiness;
	callback?: () => void;
};

const SELECT_STATUS = 'Select business status';

const BUSINESS_STATUS = {
	ACTIVE: 'ACTIVE',
	INACTIVE: 'INACTIVE',
	SUSPENDED: 'SUSPENDED',
};

const UpdateBusinessStatusForm = ({ formData, callback }: Props) => {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);

	const validationSchema = yup.object().shape({
		status: yup
			.string()
			.notOneOf([SELECT_STATUS], SELECT_STATUS)
			.required(SELECT_STATUS),
	});

	const initialValues = {
		status: SELECT_STATUS,
	};

	const { isLoading: isUpdating, mutate: mutateUpdate } = useMutation(
		updateBusiness,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });

					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}

					return;
				}

				typeof callback !== 'undefined' && callback();
				queryClient.invalidateQueries(QueryKeys.Business);
				queryClient.invalidateQueries(QueryKeys.Businesses);
				setAlert({
					message: 'Business deleted successfully!',
					type: 'success',
				});
				resetForm();
			},
		}
	);

	const {
		values,
		handleChange,
		errors,
		touched,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (!formData?.id) {
				return setAlert({
					type: 'error',
					message: 'Something went wrong, unable to update business status',
				});
			}

			mutateUpdate({
				id: formData?.id,
				data: {
					status: values.status,
				},
			});
		},
	});

	const { status } = values;

	useEffect(() => {
		if (formData && Object.keys(formData).length > 0) {
			setFieldValue('status', formData.status);
		}
	}, [formData, setFieldValue]);

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
						Select status
					</Typography>
					<Select
						fullWidth
						error={Boolean(touched.status && errors.status)}
						helpertext={touched.status ? errors.status : undefined}
						value={status}
						onChange={handleChange('status') as never}
					>
						<MenuItem disabled value={SELECT_STATUS}>
							{SELECT_STATUS}
						</MenuItem>
						{Object.values(BUSINESS_STATUS).map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</Box>
			</Box>
			<Button
				loading={isUpdating}
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

export default UpdateBusinessStatusForm;
