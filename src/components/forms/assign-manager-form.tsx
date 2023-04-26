import React from 'react';
import { Box, useTheme, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { grey } from '@mui/material/colors';
import { QueryKeys } from '../../utilities';
import CustomButton from '../button/custom-button';
import Select from '../form-components/select';
import { useAlert, useHandleError, useQueryHook } from '../../hooks';
import { managers, assignManagerToUser } from '../../api';

type Props = {
	userDetails: any;
	close?: () => void;
};

const SELECT_MANAGER = 'Select manager';

const AssignManagerForm = ({ userDetails, close }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const alert = useAlert();
	const styles = useStyles(theme);

	const queryClient = useQueryClient();
	const { isLoading: isLoadingManager, data: managersData } = useQueryHook({
		queryKey: QueryKeys.Managers,
		queryFn: () =>
			managers({
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

	const { isLoading, mutate } = useMutation(assignManagerToUser, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					alert({ message: response.message, type: 'error' });
				}
			}
			if (data && data.success) {
				alert({
					message: data.message,
					type: 'success',
				});
				queryClient.invalidateQueries(QueryKeys.Users);
				queryClient.invalidateQueries(QueryKeys.User);
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
					) : managersData && managersData.payload.length > 0 ? (
						managersData.payload.map((manager: any) => (
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
