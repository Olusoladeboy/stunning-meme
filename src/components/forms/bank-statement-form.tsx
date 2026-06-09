import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHandleError, useModalAlert } from 'hooks';
import Button from '../button';
import DateField from 'components/form-components/date-field';
import moment from 'moment';
import { statementOfAccount } from 'api';
import useToastAlert from 'hooks/useToastAlert';

type Props = {
	callback?: () => void;
	userId: string;
};

const BankStatementForm = ({ callback, userId }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const modal = useModalAlert();
	const toastAlert = useToastAlert();

	const [isLoading, setLoading] = useState<boolean>(false);

	const initialValues = {
		start_date: '',
		end_date: '',
	};

	const controller = new AbortController();

	const requestStatementOfAccount = async (values: typeof initialValues) => {
		try {
			setLoading(true);
			const response = await statementOfAccount({
				signal: controller.signal,
				params: values,
				userId,
			});

			if (response.success) {
				resetForm();
				callback?.();
				modal({
					title: 'Statement of Account',
					message: response.message,
					type: 'success',
					primaryButtonText: 'Close',
					onClickPrimaryButton: () => {
						modal(null);
					},
				});
			}
		} catch (error) {
			const response = handleError({ error });
			if (response?.message) {
				toastAlert({
					message: response.message || 'Failed to process statment of account',
					type: 'error',
				});
			}
		} finally {
			setLoading(false);
		}
	};

	const validationSchema = yup.object().shape({
		start_date: yup.string().required('Start date is required'),

		end_date: yup
			.string()
			.required('End date is required')
			.test(
				'is-after-start',
				'End date cannot be before start date',
				function (value) {
					const { start_date } = this.parent;
					if (!start_date || !value) return true;

					const start = moment(start_date);
					const end = moment(value);

					// Validation logic: Ensure end date is same or after start date
					return end.isSameOrAfter(start);
				},
			),
	});

	const onSubmit = (values: typeof initialValues) => {
		requestStatementOfAccount({
			start_date: moment(values.start_date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
			end_date: moment(values.end_date, 'DD/MM/YYYY').format('YYYY/MM/DD'),
		});
	};

	const { values, errors, touched, setFieldValue, handleSubmit, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit,
		});

	return (
		<Box>
			<Box sx={{ marginBottom: theme.spacing(4) }}>
				<Typography style={styles.title} variant={'h5'}>
					Bank Statement
				</Typography>
				<Typography variant={'body1'}>Specify date range</Typography>
			</Box>
			<Box style={styles.form as any} component={'form'}>
				<Box
					sx={{
						display: 'grid',
						gap: '10px',
						gridTemplateColumns: 'repeat(2, 1fr)',
					}}
				>
					<Box>
						<DateField
							placeholder='Start Date'
							value={values?.start_date as any}
							onChange={(value) => setFieldValue('start_date', value)}
							error={
								errors && touched.start_date ? errors.start_date : undefined
							}
						/>
					</Box>
					<Box>
						<DateField
							placeholder='End Date'
							value={values?.end_date as any}
							onChange={(value) => setFieldValue('end_date', value)}
							error={errors && touched.end_date ? errors.end_date : undefined}
						/>
					</Box>
				</Box>

				<Box>
					<Button
						fullWidth
						style={styles.btn}
						size={'large'}
						loading={isLoading}
						onClick={(e: React.FormEvent<HTMLButtonElement>) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	title: {
		fontWeight: '600',
		marginBottom: theme.spacing(2),
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	label: {
		marginBottom: theme.spacing(2),
		display: 'inline-block',
		fontWeight: '600',
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
	},
	btnOutline: {
		border: `1px solid ${theme.palette.secondary.main}`,
		fontWeight: '500',
	},
	emailText: {
		fontWeight: '600',
	},
});

export default BankStatementForm;
