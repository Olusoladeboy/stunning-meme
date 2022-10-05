import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { Box, useTheme, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import { QueryKey } from '../../utilities/types';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import ValidationSchemas from '../../utilities/validationSchema';
import { useAlert } from '../../utilities/hooks';

type Props = {
	data?: { [key: string]: any };
	level: number;
};

const KycForm = ({ data, level }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const { token } = useAppSelector((store) => store.authState);

	const initialValues = {
		dailyLimit: '',
		weeklyLimit: '',
		monthlyLimit: '',
		perTransactionLimit: '',
	};

	const queryClient = useQueryClient();
	const { isLoading, mutate } = useMutation(Api.KycLimits.Update, {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ data: error, type: 'error' });
			}
			if (data && data.success) {
				setAlert({
					data: data.message,
					type: 'success',
				});
				queryClient.invalidateQueries(QueryKey.KycLimit);
			}
		},
	});

	const { touched, errors, handleSubmit, handleChange, values, setValues } =
		useFormik({
			initialValues,
			validationSchema: ValidationSchemas.KycLimit,
			onSubmit: (values) => {
				mutate({ token: token || '', data: values, id: data ? data.id : '' });
			},
		});

	useEffect(() => {
		if (data) {
			setValues({
				dailyLimit: data.dailyLimit,
				weeklyLimit: data.weeklyLimit,
				monthlyLimit: data.monthlyLimit,
				perTransactionLimit: data.perTransactionLimit,
			});
		}
	}, [data, setValues]);

	const { dailyLimit, weeklyLimit, monthlyLimit, perTransactionLimit } = values;

	return (
		<Box component={'form'}>
			<Typography style={styles.title} variant={'h5'}>
				KYC Level {level}
			</Typography>
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
						Daily Limit
					</Typography>
					<TextInput
						fullWidth
						error={
							errors && touched.dailyLimit && errors.dailyLimit ? true : false
						}
						helperText={errors && touched.dailyLimit && errors.dailyLimit}
						placeholder={'Daily limit'}
						value={dailyLimit}
						onChange={handleChange('dailyLimit')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Weekly limit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Weekly limit'}
						error={
							errors && touched.weeklyLimit && errors.weeklyLimit ? true : false
						}
						helperText={errors && touched.weeklyLimit && errors.weeklyLimit}
						value={weeklyLimit}
						onChange={handleChange('weeklyLimit')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Monthly limit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Monthly limit'}
						error={
							errors && touched.monthlyLimit && errors.monthlyLimit
								? true
								: false
						}
						helperText={errors && touched.monthlyLimit && errors.monthlyLimit}
						value={monthlyLimit}
						onChange={handleChange('monthlyLimit')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Per Transaction limit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Per transaction limit'}
						error={
							errors &&
							touched.perTransactionLimit &&
							errors.perTransactionLimit
								? true
								: false
						}
						helperText={
							errors &&
							touched.perTransactionLimit &&
							errors.perTransactionLimit
						}
						value={perTransactionLimit}
						onChange={handleChange('perTransactionLimit')}
					/>
				</Box>
			</Box>
			<Button
				loading={isLoading}
				buttonProps={{
					style: styles.btn,
					size: 'large',
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
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	title: {
		marginBottom: theme.spacing(3),
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
		marginTop: theme.spacing(4),
	},
});

export default KycForm;
