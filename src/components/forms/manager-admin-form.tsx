import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import { grey } from '@mui/material/colors';
import {
	ManagerTypes,
	ManagerDetailsDataTypes,
	QueryKeyTypes,
} from '../../utilities/types';
import Api from '../../utilities/api';
import ValidationSchema from '../../utilities/validationSchema';
import { useAppSelector } from '../../store/hooks';
import handleResponse from '../../utilities/helpers/handleResponse';
import Select from '../form-components/Select';

const AMIN_ROLES = ['OPERATIONS', 'CUSTOMER_SUPPORT'];
const SELECT_ADMIN_PRIVILEDGE = 'Select Admin Priviledge';

interface ManagerDetails extends ManagerDetailsDataTypes {
	id?: string;
	role?: string;
}

type Props = {
	type: ManagerTypes.Admin | ManagerTypes.Manager | null;
	onSuccess?: () => void;
	managerDetails?: ManagerDetails | null;
	isEdit?: boolean;
};

const ManagerAdminForm = ({
	type,
	onSuccess,
	managerDetails,
	isEdit,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const { token } = useAppSelector((store) => store.authState);

	const initialValues: ManagerDetails = {
		firstname: '',
		lastname: '',
		phone: '',
		email: '',
		role: SELECT_ADMIN_PRIVILEDGE,
	};

	const { isLoading: isCreatingManager, mutate: createManager } = useMutation(
		Api.Manager.CreateManager,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeyTypes.AllManagers);
					enqueueSnackbar(data.message, { variant: 'success' });
					typeof onSuccess !== 'undefined' && onSuccess();
				}
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isCreatingStaff, mutate: createStaff } = useMutation(
		Api.Staff.Create,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeyTypes.AllStaff);
					enqueueSnackbar(data.message, { variant: 'success' });
					typeof onSuccess !== 'undefined' && onSuccess();
				}
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isUpdatingManager, mutate: updateManager } = useMutation(
		Api.Manager.UpdateManager,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeyTypes.AllManagers);
					enqueueSnackbar(data.message, { variant: 'success' });
					typeof onSuccess !== 'undefined' && onSuccess();
				}
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
			},
		}
	);

	const { isLoading: isUpdatingStaff, mutate: updateStaff } = useMutation(
		Api.Staff.Update,
		{
			onSettled: (data, error) => {
				if (data && data.success) {
					resetForm();
					queryClient.invalidateQueries(QueryKeyTypes.AllStaff);
					enqueueSnackbar(data.message, { variant: 'success' });
					typeof onSuccess !== 'undefined' && onSuccess();
				}
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
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
						phone: managerDetails.phone,
						email: managerDetails.email,
						role:
							type === ManagerTypes.Admin
								? managerDetails.role
								: SELECT_ADMIN_PRIVILEDGE,
				  }
				: initialValues,
			validationSchema: ValidationSchema.ManagerDetails,
			onSubmit: (values) => {
				const { role, ...rest } = values;
				if (type === ManagerTypes.Manager) {
					if (isEdit && managerDetails && managerDetails.id) {
						return updateManager({
							token: token as string,
							data: rest,
							id: managerDetails.id,
						});
					}
					createManager({
						data: rest,
						token: token as string,
					});
				} else {
					if (isEdit && managerDetails && managerDetails.id) {
						return updateStaff({
							token: token as string,
							data: { ...rest, role: role as string },
							id: managerDetails.id,
						});
					}
					createStaff({
						data: { ...rest, role: role as string },
						token: token as string,
					});
				}
			},
		});

	const { firstname, lastname, email, phone, role } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
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
				</Box>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Email
						</Typography>
						<TextInput
							fullWidth
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
							error={errors && touched.phone && errors.phone ? true : false}
							helperText={errors && touched.phone && errors.phone}
							placeholder={'phone number'}
							value={phone}
							onChange={handleChange('phone')}
						/>
					</Box>
				</Box>
				<Box sx={{ display: type === ManagerTypes.Admin ? 'block' : 'none' }}>
					<Typography variant={'body1'} style={styles.label}>
						Select priviledge
					</Typography>
					<Select fullWidth value={role} onChange={handleChange('role') as any}>
						<MenuItem value={SELECT_ADMIN_PRIVILEDGE}>
							{SELECT_ADMIN_PRIVILEDGE}
						</MenuItem>
						{AMIN_ROLES.map((role) => (
							<MenuItem value={role} key={role}>
								{role}
							</MenuItem>
						))}
					</Select>
				</Box>
			</Box>
			<Button
				loading={
					isCreatingManager ||
					isUpdatingManager ||
					isCreatingStaff ||
					isUpdatingStaff
				}
				buttonProps={{
					type: 'submit',
					onClick: (e) => {
						e.preventDefault();
						handleSubmit();
					},
					size: 'large',
					style: styles.btn,
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

export default ManagerAdminForm;
