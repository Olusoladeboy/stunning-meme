import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { grey } from '@mui/material/colors';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { Settings, QueryKeys } from 'utilities';
import { createSettings, updateSettings } from 'api';
import { useHandleError, useAlert } from 'hooks';

type Props = {
	data?: Settings | null;
	callback?: () => void;
};

const ReferralBonusForm = ({ data, callback }: Props) => {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const alert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);

	const initialValues: Settings = {
		name: '',
		value: '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required('Enter  referral name'),
		value: yup.string().required('Enter  referral value'),
	});

	const { isLoading: isCreatingSettings, mutate: mutateCreateSettings } =
		useMutation(createSettings, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeys.Settings);
					typeof callback !== 'undefined' && callback();
					alert({
						message: 'Settings created successfully!',
						type: 'success',
					});
				}
			},
		});

	const { isLoading: isUpdatingSettings, mutate: mutateUpdateSettings } =
		useMutation(updateSettings, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						alert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKeys.Settings);
					typeof callback !== 'undefined' && callback();
					alert({
						message: 'Settings updated successfully!',
						type: 'success',
					});
				}
			},
		});

	const { values, handleChange, handleSubmit, errors, touched } = useFormik({
		initialValues: data ? data : initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (Boolean(data)) {
				let payload = {} as typeof initialValues;
				payload.value = values.value;
				return mutateUpdateSettings({ data: payload, id: data?.id as string });
			}
			mutateCreateSettings(values);
		},
	});

	const { name, value } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Referral Name
					</Typography>
					<TextInput
						fullWidth
						disabled={Boolean(data)}
						error={touched.name && Boolean(errors.name)}
						helperText={touched.name && errors.name}
						placeholder={'Referral bonus'}
						value={name}
						onChange={handleChange('name')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Referral Bonus
					</Typography>
					<TextInput
						fullWidth
						error={touched.value && Boolean(errors.value)}
						helperText={touched.value && errors.value}
						placeholder={'Referral bonus'}
						value={value}
						onChange={handleChange('value')}
					/>
				</Box>
			</Box>

			<Button
				loading={isCreatingSettings || isUpdatingSettings}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				size={'large'}
				style={styles.btn}
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
		justifyContent: 'space-between',
		gap: '20px',
		height: '420px',
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

export default ReferralBonusForm;
