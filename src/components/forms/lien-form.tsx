import React, { CSSProperties, SyntheticEvent } from 'react';
import {
	Box,
	useTheme,
	Typography,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Select from '../form-components/select';
import { User, QueryKeys } from 'utilities';
import { useAlert, useHandleError } from 'hooks';
import { updateLien } from 'api';

export const LIEN_TYPE = {
	CREDIT: 'CREDIT',
	DEBIT: 'DEBIT',
};

type Props = {
	user: User | null;
	close?: () => void;
};

interface InitialValues {
	type: string;
	lien: string;
}

const SELECT_TYPE = 'Select lien type';

const LienForm = ({ user, close }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const setAlert = useAlert();

	const validationSchema = yup.object().shape({
		type: yup
			.string()
			.notOneOf([SELECT_TYPE], SELECT_TYPE)
			.required(SELECT_TYPE),
		lien: yup.number().required('Specify Amount'),
	});

	const { isLoading, mutate } = useMutation(updateLien, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				resetForm();
				typeof close === 'function' && close();
				queryClient.invalidateQueries(QueryKeys.UserWallet);
				queryClient.invalidateQueries(QueryKeys.UserWalletTransaction);
			}
		},
	});

	const initialValues: InitialValues = {
		type: SELECT_TYPE,
		lien: '',
	};

	const {
		values,
		handleChange,
		handleSubmit,
		errors,
		touched,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			const data = {
				lien: values.lien as string,
				type: values.type as string,
			};

			mutate({
				id: user?.id as string,
				data,
			});
		},
	});

	const { lien, type } = values;

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			{/* <Box>
				<Typography variant={'body1'} style={styles.label}>
					Amount
				</Typography>
				<TextInput
					fullWidth
					placeholder={'Amount'}
					error={errors && touched.lien && errors.lien ? true : false}
					helperText={errors && touched.lien && errors.lien}
					type={'number'}
					value={lien}
					onChange={handleChange('lien')}
				/>
			</Box> */}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: type === SELECT_TYPE ? '1fr' : '3fr 7fr',
					},
					gap: theme.spacing(3),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Lien Type
					</Typography>
					<Select
						fullWidth
						error={errors && touched.type && errors.type ? true : false}
						helpertext={errors && touched.type && errors.type}
						value={type}
						onChange={(e: SelectChangeEvent<unknown>) => {
							const value = e.target.value;

							setFieldValue('type', value);
						}}
					>
						<MenuItem disabled value={SELECT_TYPE}>
							{SELECT_TYPE}
						</MenuItem>
						{Object.values(LIEN_TYPE).map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</Box>
				{type !== SELECT_TYPE && (
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Amount
						</Typography>
						<TextInput
							fullWidth
							placeholder={'Amount'}
							error={errors && touched.lien && errors.lien ? true : false}
							helperText={errors && touched.lien && errors.lien}
							type={'number'}
							value={lien}
							onChange={handleChange('lien')}
						/>
					</Box>
				)}
			</Box>

			<Button
				loading={isLoading}
				onClick={(e: SyntheticEvent) => {
					e.preventDefault();
					handleSubmit();
				}}
				size={'large'}
				style={styles.btn}
			>
				Submit
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
		minWidth: '120px',
	},
});

export default LienForm;
