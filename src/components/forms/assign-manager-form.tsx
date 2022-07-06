import React, { useState } from 'react';
import { Box, useTheme, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import { grey } from '@mui/material/colors';
import LINKS from '../../utilities/links';
import { QueryKeyTypes } from '../../utilities/types';
import Api from '../../utilities/api';
import handleResponse from '../../utilities/helpers/handleResponse';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import CustomButton from '../button/custom-button';
import Select from '../form-components/Select';

type Props = {
	userDetails: any;
	close?: () => void;
};

const SELECT_MANAGER = 'Select manager';

const AssignManagerForm = ({ userDetails, close }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const { enqueueSnackbar } = useSnackbar();
	const { token } = useAppSelector((store) => store.authState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [managers, setManagers] = useState<null | { [key: string]: any }[]>(
		null
	);
	const queryClient = useQueryClient();
	const { isLoading: isLoadingManager } = useQuery(
		QueryKeyTypes.AllManagers,
		() => Api.Manager.AllManagers(token || ''),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({ error, isDisplayMessage: true });
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}

				if (data && data.success) {
					setManagers(data.payload);
				}
			},
		}
	);
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
				const res = handleResponse({ error, isDisplayMessage: true });
				if (res?.message) {
					enqueueSnackbar(res.message, { variant: 'error' });
				} else {
					enqueueSnackbar('Something went wrong, try again', {
						variant: 'error',
					});
				}
			}
			if (data && data.success) {
				enqueueSnackbar(data.message, { variant: 'success' });
				queryClient.invalidateQueries(QueryKeyTypes.AllUsers);
				queryClient.invalidateQueries(QueryKeyTypes.GetSingleUser);
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
					) : managers && managers.length > 0 ? (
						managers.map((manager) => (
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
				buttonProps={{
					onClick: (e: any) => {
						e.preventDefault();
						handleSubmit();
					},
					style: styles.btn,
					size: 'large',
					type: 'submit',
				}}
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
