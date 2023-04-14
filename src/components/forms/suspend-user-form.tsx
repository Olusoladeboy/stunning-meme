import React, { CSSProperties, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, Switch } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import { UserDetails, QueryKeys } from '../../utilities';
import TextArea from '../form-components/text-area';
import { useAlert, useHandleError } from '../../hooks';
import { suspendUser } from '../../api';
import Loader from '../loader';

interface InitialValues {
	suspended: boolean;
	suspensionDurationInDays: string;
	suspensionReason: string;
}

type Props = {
	user: UserDetails | null;
};

const SuspendUserForm = ({ user }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const setAlert = useAlert();
	const [isUnsuspending, setUnsuspending] = useState<boolean>(false);

	const validationSchema = yup.object().shape({
		suspended: yup.boolean().required('Suspend or unsuspend user'),
		suspensionDurationInDays: yup
			.number()
			.required('Enter suspension duration in days'),
		suspensionReason: yup.string().required('Enter suspension reason'),
	});

	const queryClient = useQueryClient();
	const { isLoading, mutate } = useMutation(suspendUser, {
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
				queryClient.invalidateQueries(QueryKeys.AllUsers);
				queryClient.invalidateQueries(QueryKeys.GetSingleUser);
				queryClient.invalidateQueries(QueryKeys.Statistics);
			}
		},
	});

	const initialValues: InitialValues = {
		suspended: true,
		suspensionDurationInDays: '',
		suspensionReason: '',
	};

	const {
		handleChange,
		handleSubmit,
		values,
		touched,
		errors,
		setFieldValue,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			mutate({
				data: { ...values, suspended: true },
				id: user?.id as string,
			});
		},
	});

	useEffect(() => {
		if (user) {
			setFieldValue('suspended', user.suspended);
		}
	}, [user, setFieldValue]);

	const { suspended, suspensionDurationInDays, suspensionReason } = values;

	const handleUnsuspendUser = async () => {
		setUnsuspending(true);
		setFieldValue('suspended', !suspended);

		try {
			const data = await suspendUser({
				data: { suspended: false },
				id: user?.id as string,
			});
			if (data && data.success) {
				queryClient.invalidateQueries(QueryKeys.AllUsers);
				queryClient.invalidateQueries(QueryKeys.GetSingleUser);
				queryClient.invalidateQueries(QueryKeys.Statistics);
			}
			setUnsuspending(false);
		} catch (error) {
			setUnsuspending(false);

			const response = handleError({ error });
			if (response?.message) {
				alert({ message: response.message, type: 'error' });
			}
		}
	};

	return (
		<>
			{isUnsuspending && <Loader />}
			<Box component={'form'}>
				<Box style={styles.switchWrapper}>
					<Typography style={styles.text as CSSProperties}>
						{user?.suspended ? 'Unsuspend user' : 'Suspend user'}
					</Typography>
					{user?.suspended && (
						<Switch
							checked={suspended}
							onChange={() => {
								handleUnsuspendUser();
							}}
						/>
					)}
				</Box>
				{user && !user.suspended && (
					<>
						<Box style={styles.formWrapper as CSSProperties}>
							<Box>
								<TextInput
									fullWidth
									type={'number'}
									placeholder={'Enter duration (in days)'}
									error={
										errors &&
										touched.suspensionDurationInDays &&
										errors.suspensionDurationInDays
											? true
											: false
									}
									helperText={
										errors &&
										touched.suspensionDurationInDays &&
										errors.suspensionDurationInDays
									}
									value={suspensionDurationInDays}
									onChange={handleChange('suspensionDurationInDays')}
								/>
							</Box>

							<Box>
								<TextArea
									rows={4}
									fullWidth
									placeholder={'Enter suspension note'}
									error={
										errors &&
										touched.suspensionReason &&
										errors.suspensionReason
											? true
											: false
									}
									helperText={
										errors &&
										touched.suspensionReason &&
										errors.suspensionReason
									}
									value={suspensionReason}
									onChange={handleChange('suspensionReason')}
								/>
							</Box>

							<Button
								loading={isLoading}
								onClick={(e: React.FormEvent<HTMLButtonElement>) => {
									e.preventDefault();
									handleSubmit();
								}}
								size={'large'}
								style={styles.btn}
							>
								Suspend user
							</Button>
						</Box>
					</>
				)}
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

export default SuspendUserForm;
