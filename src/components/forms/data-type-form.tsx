import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import { grey } from '@mui/material/colors';
import { DataType, QueryKeys } from 'utilities';
import Button from '../button';
import { useAlert, useHandleError } from 'hooks';
import { createDataTypes } from 'api';

type Props = {
	isEdit?: boolean;
	callback?: () => void;
	type?: DataType;
};

const DataTypeForm: React.FC<Props> = ({ isEdit = false, callback, type }) => {
	const theme = useTheme();
	const { network } = useParams();
	const handleError = useHandleError();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();

	const initialValues: DataType = {
		name: '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required('Enter data type name'),
	});

	const { isLoading, mutate: mutateCreateDataType } = useMutation(
		createDataTypes,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						setAlert({ message: response.message, type: 'error' });
				}

				if (data && data.success) {
					setAlert({
						message: data.message,
						type: 'success',
					});
					queryClient.invalidateQueries(QueryKeys.DataTypes);
					queryClient.invalidateQueries(QueryKeys.DataNetwork);
					typeof callback !== 'undefined' && callback();
				}
			},
		}
	);

	/*
	 *Create DataType
	 */
	const { errors, touched, values, handleChange, handleSubmit } = useFormik({
		initialValues: type ? type : initialValues,
		validationSchema,
		onSubmit: (values) => {
			if (isEdit) {
				return;
			}

			const payload = { ...values, network };

			mutateCreateDataType(payload);
		},
	});

	const { name } = values;

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
						Data type name
					</Typography>
					<TextInput
						disabled={isEdit}
						fullWidth
						placeholder={'Enter data type name'}
						error={touched.name && errors.name ? true : false}
						helperText={touched.name && errors.name}
						value={name}
						onChange={handleChange('name')}
					/>
				</Box>
			</Box>
			<Button
				onClick={(e: React.FormEvent<HTMLButtonElement>) => {
					e.preventDefault();
					handleSubmit();
				}}
				loading={isLoading}
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
		height: '320px',
		justifyContent: 'space-between',
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

export default DataTypeForm;
