import React, { CSSProperties } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import { QueryKeys } from 'utilities';
import TextArea from '../form-components/text-area';
import { useAlert, useHandleError } from 'hooks';
import { useAppSelector } from 'store/hooks';
import { createBlacklistNumber } from 'api/blacklist';

interface InitialValues {
	phone_number: string;
	reason: string;
}

type Props = {
	callback?: () => void;
};

const BlacklistNumberForm = ({ callback }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const setAlert = useAlert();

	const canCreateOrUpdateRecord = useAppSelector(
		(store) => store.authState.canCreateOrUpdateRecord,
	);

	const validationSchema = yup.object().shape({
		phone_number: yup.string().required('Phone number is required'),
		reason: yup.string().required('Enter suspension reason'),
	});

	const queryClient = useQueryClient();
	const { isLoading, mutate } = useMutation(createBlacklistNumber, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				setAlert({ message: data.message, type: 'success' });
				resetForm();
				queryClient.invalidateQueries(QueryKeys.BlacklistedNumbers);
				callback?.();
			}
		},
	});

	const initialValues: InitialValues = {
		reason: '',
		phone_number: '',
	};

	const { handleChange, handleSubmit, values, touched, errors, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: (values) => {
				mutate(values);
			},
		});

	const { reason, phone_number } = values;

	return (
		<>
			<Box component={'form'}>
				<Box style={styles.formWrapper as CSSProperties}>
					<Box>
						<TextInput
							disabled={!canCreateOrUpdateRecord}
							fullWidth
							placeholder={'Enter phone number'}
							error={
								errors && touched.phone_number && errors.phone_number
									? true
									: false
							}
							helperText={errors && touched.phone_number && errors.phone_number}
							value={phone_number}
							onChange={handleChange('phone_number')}
						/>
					</Box>

					<Box>
						<TextArea
							disabled={!canCreateOrUpdateRecord}
							rows={4}
							fullWidth
							placeholder={'Enter reason'}
							error={errors && touched.reason && errors.reason ? true : false}
							helperText={errors && touched.reason && errors.reason}
							value={reason}
							onChange={handleChange('reason')}
						/>
					</Box>

					<Button
						disabled={!canCreateOrUpdateRecord}
						loading={isLoading}
						onClick={(e: React.FormEvent<HTMLButtonElement>) => {
							e.preventDefault();
							handleSubmit();
						}}
						size={'large'}
						style={styles.btn}
					>
						Blacklist number
					</Button>
				</Box>
			</Box>
		</>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	switchWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
	},
	text: {
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});

export default BlacklistNumberForm;
