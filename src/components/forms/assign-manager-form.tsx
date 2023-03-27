import React from 'react';
import { Box, useTheme, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { grey } from '@mui/material/colors';
import { QueryKey } from '../../utilities/types';
import Api from '../../utilities/api';
import { useAppSelector } from '../../store/hooks';
import CustomButton from '../button/custom-button';
import Select from '../form-components/Select';
import { useQueryHook } from '../../utilities/api/hooks';
import { useAlert } from '../../utilities/hooks';

type Props = {
	userDetails: any;
	close?: () => void;
};

const SELECT_MANAGER = 'Select manager';

const AssignManagerForm = ({ userDetails, close }: Props) => {
	const theme = useTheme();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const { token } = useAppSelector((store) => store.authState);

	const queryClient = useQueryClient();
	const { isLoading: isLoadingManager, data: managers } = useQueryHook({
		queryKey: QueryKey.AllManagers,
		queryFn: () =>
			Api.Manager.AllManagers({
				token: token as string,
				params: {
					sort: '-createdAt',
				},
			}),
	});
	const validationSchema = yup.object().shape({
		manager: yup
			.string()
			.notOneOf([SELECT_MANAGER], 'Select a manager')
			.required('Select Manager'),
	});

	const initialValues = {
		manager: SELECT_MANAGER,
	};

	const { isLoading, mutate } = useMutation(Api.User.AssignManagerToUser, {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ data: error, type: 'error' });
			}
			if (data && data.success) {
				setAlert({
					data: data.message,
					type: 'success',
				});
				queryClient.invalidateQueries(QueryKey.AllUsers);
				queryClient.invalidateQueries(QueryKey.GetSingleUser);
				resetForm();
				typeof close !== 'undefined' && close();
			}
		},
	});

	const { handleChange, errors, touched, values, handleSubmit, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: (values) => {
				mutate({
					token: token || '',
					data: values,
					id: userDetails ? userDetails.id : '',
				});
			},
		});

	const { manager } = values;

	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<Box style={styles.label} component={'label'}>
					Select Manager
				</Box>
				<Select
					fullWidth
					value={manager}
					error={errors && touched.manager && errors.manager ? true : false}
					helpertext={errors && touched.manager && errors.manager}
					onChange={handleChange('manager') as any}
				>
					<MenuItem value={SELECT_MANAGER} disabled>
						{SELECT_MANAGER}
					</MenuItem>
					{isLoadingManager ? (
						<MenuItem>loading...</MenuItem>
					) : managers && managers.payload.length > 0 ? (
						managers.payload.map((manager: any) => (
							<MenuItem
								value={manager.id}
								key={manager.id}
							>{`${manager.firstname} ${manager.lastname}`}</MenuItem>
						))
					) : (
						<MenuItem>No manager</MenuItem>
					)}
				</Select>
			</Box>

			<CustomButton
				loading={isLoading}
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={styles.btn}
				size={'large'}
				type={'submit'}
			>
				Submit
			</CustomButton>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		paddingLeft: '30px',
		paddingRight: '30px',
		marginTop: '4rem',
	},

	label: {
		display: 'inline-block',
		marginBottom: theme.spacing(1),
	},
});

export default AssignManagerForm;
