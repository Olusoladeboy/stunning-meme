import React, { CSSProperties, SyntheticEvent, useState } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import CustomButton from '../button/custom-button';
import { grey } from '@mui/material/colors';
import Select from '../form-components/Select';
import { UserDetailsType, QueryKeyTypes } from '../../utilities/types';
import Api from '../../utilities/api';
import { useAlert } from '../../utilities/hooks';
import { useAppSelector } from '../../store/hooks';

type Props = {
	user: UserDetailsType | null;
	close?: () => void;
};

const SELECT_CONDITION = 'Select condition';
const SELECT_SERVICE = 'Select Service';

enum ConditionType {
	Credit = 'CREDIT',
	Debit = 'DEBIT',
}

enum ServiceType {
	Refund = 'REFUND',
	Others = 'OTHERS',
}

const EditWalletForm = ({ user, close }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const [isDone, setDone] = useState<boolean>(false);
	const { token } = useAppSelector((store) => store.authState);

	const validationSchema = yup.object().shape({
		type: yup
			.string()
			.notOneOf([SELECT_CONDITION], 'Select Conditon')
			.required('Select Condition'),
		amount: yup.number().required('Specify amount'),
		service: yup
			.string()
			.notOneOf([SELECT_SERVICE], 'Select service')
			.required('Select service'),
	});

	const { mutate, isLoading } = useMutation(Api.Transactions.TransactUser, {
		onSettled: (data, error) => {
			if (error) {
				setAlert({ alert: error, isError: true });
			}

			if (data && data.success) {
				setDone(true);
				setAlert({ alert: data.message, type: 'success' });
				queryClient.invalidateQueries(QueryKeyTypes.GetSingleUser);
				queryClient.invalidateQueries(QueryKeyTypes.UserWallet);
			}
		},
	});

	const initialValues = {
		type: SELECT_CONDITION,
		amount: '',
		service: SELECT_SERVICE,
	};

	const { values, handleChange, handleSubmit, errors, touched, resetForm } =
		useFormik({
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

	const { type, amount, service } = values;

	const handleDone = () => {
		if (isDone) {
			resetForm();
			setDone(false);
			typeof close !== 'undefined' && close();
		} else {
			typeof close !== 'undefined' && close();
		}
	};

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: '3fr 7fr',
					},
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Condition
					</Typography>
					<Select
						fullWidth
						error={errors && touched.type && errors.type ? true : false}
						helpertext={errors && touched.type && errors.type}
						value={type}
						onChange={handleChange('type') as any}
					>
						<MenuItem disabled value={SELECT_CONDITION}>
							{SELECT_CONDITION}
						</MenuItem>
						<MenuItem value={ConditionType.Credit}>
							{ConditionType.Credit}
						</MenuItem>
						<MenuItem value={ConditionType.Debit}>
							{ConditionType.Debit}
						</MenuItem>
					</Select>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Amount
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Amount'}
						error={errors && touched.amount && errors.amount ? true : false}
						helperText={errors && touched.amount && errors.amount}
						type={'number'}
						value={amount}
						onChange={handleChange('amount')}
					/>
				</Box>
			</Box>
			<Box>
				<Typography variant={'body1'} style={styles.label}>
					Select Service
				</Typography>
				<Select
					fullWidth
					error={errors && touched.service && errors.service ? true : false}
					helpertext={errors && touched.service && errors.service}
					value={service}
					onChange={handleChange('service') as any}
				>
					<MenuItem disabled value={SELECT_SERVICE}>
						{SELECT_SERVICE}
					</MenuItem>
					<MenuItem value={ServiceType.Refund}>{ServiceType.Refund}</MenuItem>
					<MenuItem value={ServiceType.Others}>{ServiceType.Others}</MenuItem>
				</Select>
			</Box>
			<Box style={styles.btnWrapper}>
				<CustomButton
					loading={isLoading}
					buttonProps={{
						variant: 'outlined',
						size: 'large',
						style: styles.btnOutline,
						onClick: (e: SyntheticEvent) => {
							e.preventDefault();
							handleSubmit();
						},
					}}
				>
					Update
				</CustomButton>
				<Button
					onClick={(e: SyntheticEvent) => {
						e.preventDefault();
						handleDone();
					}}
					size={'large'}
					style={styles.btn}
				>
					{isDone ? 'Done' : 'Close'}
				</Button>
			</Box>
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
	btnWrapper: {
		display: 'flex',
		gap: theme.spacing(3),
		alignSelf: 'flex-end',
		marginTop: theme.spacing(4),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '120px',
	},
	btnOutline: {
		// color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '120px',
		borderColor: theme.palette.primary.color,
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

export default EditWalletForm;
