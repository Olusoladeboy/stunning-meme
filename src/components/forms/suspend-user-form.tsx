import React, { CSSProperties, useEffect } from 'react';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Box, useTheme, Typography, Switch } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import { UserDetails, QueryKey } from '../../utilities/types';
import TextArea from '../form-components/text-area';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import { useAlert } from '../../utilities/hooks';
import UnsuspendUser from '../unsuspend-user';

type Props = {
	user: UserDetails | null;
};

const SuspendUserForm = ({ user }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const setAlert = useAlert();
	const { token } = useAppSelector((store) => store.authState);

	const validationSchema = yup.object().shape({
		suspended: yup.boolean().required('Suspend or unsuspend user'),
		suspensionDurationInDays: yup
			.number()
			.required('Enter suspension duration in days'),
		suspensionReason: yup.string().required('Enter suspension reason'),
	});

	const queryClient = useQueryClient();
	const { isLoading, mutate } = useMutation(Api.User.SuspendUser, {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ data: error, isError: true });
			}

			if (data && data.success) {
				setAlert({ data: data.message, type: 'success' });
				resetForm();
				queryClient.invalidateQueries(QueryKey.AllUsers);
				queryClient.invalidateQueries(QueryKey.GetSingleUser);
				queryClient.invalidateQueries(QueryKey.Statistics);
			}
		},
	});

	const initialValues = {
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
				token: token as string,
				data: values,
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

	return (
		<>
			{user?.suspended ? (
				<Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Typography style={styles.text as CSSProperties} variant={'body1'}>
							Unsuspend User
						</Typography>
						<UnsuspendUser isSwitch user={user} />
					</Box>
				</Box>
			) : (
				<Box component={'form'}>
					<Box style={styles.switchWrapper}>
						<Typography style={styles.text as CSSProperties}>
							{user?.suspended ? 'Unsuspend user' : 'Suspend user'}
						</Typography>
						<Switch checked={suspended} onChange={handleChange('suspended')} />
					</Box>
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
									errors && touched.suspensionReason && errors.suspensionReason
										? true
										: false
								}
								helperText={
									errors && touched.suspensionReason && errors.suspensionReason
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
				</Box>
			)}
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
