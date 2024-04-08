import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import {
	ManagerTypes,
	QueryKeys,
	validationSchema,
	ADMIN_ROLE,
	User,
} from 'utilities';
import Select from '../form-components/select';
import { useAlert, useHandleError } from 'hooks';
import { createStaff, updateStaff, createManager, updateManager } from 'api';
import UploadUserAvatar from '../upload-user-avatar';

const SELECT_ADMIN_PRIVILEDGE = 'Select Admin Priviledge';

type Props = {
	type: ManagerTypes.Admin | ManagerTypes.Manager | null;
	callback?: () => void;
	managerDetails?: User | null | undefined;
};

const ManagerAdminForm = ({ type, callback, managerDetails }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const isEdit = Boolean(
		managerDetails && Object.values(managerDetails).length > 0
	);

	const initialValues: User = {
		firstname: '',
		lastname: '',
		email: '',
		role: SELECT_ADMIN_PRIVILEDGE,
		phone: '',
	};

	const { isLoading: isCreatingManager, mutate: mutateCreateManager } =
		useMutation(createManager, {
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeys.Managers);
					setAlert({
						message: data.message,
						type: 'success',
					});
					typeof callback !== 'undefined' && callback();
				}
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		});

	const { isLoading: isCreatingStaff, mutate: mutateCreateStaff } = useMutation(
		createStaff,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					setAlert({
						message: data.message,
						type: 'success',
					});

					queryClient.invalidateQueries(QueryKeys.Staffs);

					typeof callback !== 'undefined' && callback();
				}
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isUpdatingManager, mutate: mutateUpdateManager } =
		useMutation(updateManager, {
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeys.Managers);
					setAlert({
						message: data.message,
						type: 'success',
					});
					typeof callback !== 'undefined' && callback();
				}
				if (error) {
					const response = handleError({ error });

					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		});

	const { isLoading: isUpdatingStaff, mutate: mutateUpdateStaff } = useMutation(
		updateStaff,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeys.Staffs);
					setAlert({
						message: data.message,
						type: 'success',
					});
					typeof callback !== 'undefined' && callback();
				}
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}
			},
		}
	);

	const { values, handleSubmit, handleChange, errors, touched, resetForm } =
		useFormik({
			initialValues: managerDetails
				? {
						firstname: managerDetails.firstname,
						lastname: managerDetails.lastname,
						email: managerDetails.email,
						role:
							type === ManagerTypes.Admin
								? managerDetails.role
								: SELECT_ADMIN_PRIVILEDGE,
				  }
				: initialValues,
			validationSchema: validationSchema.ManagerDetails,
			onSubmit: (values) => {
				const { role, ...rest } = values;
				if (type === ManagerTypes.Manager) {
					if (isEdit && managerDetails && managerDetails.id) {
						return mutateUpdateManager({
							data: rest,
							id: managerDetails.id,
						});
					}
					mutateCreateManager(rest);
				} else {
					if (isEdit && managerDetails && managerDetails.id) {
						return mutateUpdateStaff({
							data: { ...rest, role: role as string },
							id: managerDetails.id,
						});
					}
					mutateCreateStaff({ ...rest, role: role as string });
				}
			},
		});

	const { firstname, lastname, email, role, phone } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				{isEdit && (
					<UploadUserAvatar managerId={managerDetails?.id as string} />
				)}
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							First Name
						</Typography>
						<TextInput
							fullWidth
							error={
								errors && touched.firstname && errors.firstname ? true : false
							}
							helperText={errors && touched.firstname && errors.firstname}
							placeholder={'First name'}
							value={firstname}
							onChange={handleChange('firstname')}
						/>
					</Box>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Last name
						</Typography>
						<TextInput
							fullWidth
							error={
								errors && touched.lastname && errors.lastname ? true : false
							}
							helperText={errors && touched.lastname && errors.lastname}
							placeholder={'Last name'}
							value={lastname}
							onChange={handleChange('lastname')}
						/>
					</Box>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Email
						</Typography>
						<TextInput
							fullWidth
							disabled={isEdit}
							error={errors && touched.email && errors.email ? true : false}
							helperText={errors && touched.email && errors.email}
							placeholder={'Email'}
							value={email}
							onChange={handleChange('email')}
						/>
					</Box>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Phone number
						</Typography>
						<TextInput
							fullWidth
							error={Boolean(touched.phone && errors.phone)}
							helperText={errors && touched.phone && errors.phone}
							placeholder={'phone number'}
							value={phone}
							onChange={handleChange('phone')}
						/>
					</Box>
					<Box sx={{ display: type === ManagerTypes.Admin ? 'block' : 'none' }}>
						<Typography variant={'body1'} style={styles.label}>
							Select priviledge
						</Typography>
						<Select
							fullWidth
							value={role}
							onChange={handleChange('role') as any}
						>
							<MenuItem value={SELECT_ADMIN_PRIVILEDGE}>
								{SELECT_ADMIN_PRIVILEDGE}
							</MenuItem>
							<MenuItem value={ADMIN_ROLE.OPERATIONS}>
								{ADMIN_ROLE.OPERATIONS}
							</MenuItem>
							<MenuItem value={ADMIN_ROLE.CUSTOMER_SUPPORT}>
								{ADMIN_ROLE.CUSTOMER_SUPPORT}
							</MenuItem>
						</Select>
					</Box>
				</Box>
			</Box>
			<Button
				loading={
					isCreatingManager ||
					isUpdatingManager ||
					isCreatingStaff ||
					isUpdatingStaff
				}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				type={'submit'}
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

export default ManagerAdminForm;
