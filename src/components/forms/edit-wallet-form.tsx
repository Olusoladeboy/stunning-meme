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
import { UserDetails, QueryKeys, FUND_WALLET_SERVICE } from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { transactUser } from '../../api';

type Props = {
	user: UserDetails | null;
	close?: () => void;
};

const SELECT_CONDITION = 'Select condition';
const SELECT_SERVICE = 'Select Service';

const EditWalletForm = ({ user, close }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const [isDone, setDone] = useState<boolean>(false);

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

	const { mutate, isLoading } = useMutation(transactUser, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				setDone(true);
				setAlert({ message: data.message, type: 'success' });
				queryClient.invalidateQueries(QueryKeys.GetSingleUser);
				queryClient.invalidateQueries(QueryKeys.UserWallet);
				queryClient.invalidateQueries(QueryKeys.UserWalletTransaction);
			}
		},
	});

	const initialValues = {
		type: SELECT_CONDITION,
		amount: '',
		service: SELECT_SERVICE,
		reference: '',
	};

	const { values, handleChange, handleSubmit, errors, touched, resetForm } =
		useFormik({
			initialValues,
			validationSchema,
			onSubmit: (values) => {
				mutate({
					data: values,
					id: user?.id as string,
				});
			},
		});

	const { amount, service, reference } = values;

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
						md: service === SELECT_SERVICE ? '1fr' : '3fr 7fr',
					},
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Service
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
						<MenuItem value={FUND_WALLET_SERVICE.CREDIT}>
							{FUND_WALLET_SERVICE.CREDIT}
						</MenuItem>
						<MenuItem value={FUND_WALLET_SERVICE.DEBIT}>
							{FUND_WALLET_SERVICE.DEBIT}
						</MenuItem>{' '}
						<MenuItem value={FUND_WALLET_SERVICE.REFUND}>
							{FUND_WALLET_SERVICE.REFUND}
						</MenuItem>
					</Select>
				</Box>
				{service !== SELECT_SERVICE && (
					<>
						{service === FUND_WALLET_SERVICE.REFUND ? (
							<Box>
								<Typography variant={'body1'} style={styles.label}>
									Reference
								</Typography>
								<TextInput
									fullWidth
									placeholder={'Enter transaction reference'}
									error={
										errors && touched.reference && errors.reference
											? true
											: false
									}
									helperText={errors && touched.reference && errors.reference}
									type={'number'}
									value={reference}
									onChange={handleChange('reference')}
								/>
							</Box>
						) : (
							<Box>
								<Typography variant={'body1'} style={styles.label}>
									Amount
								</Typography>
								<TextInput
									fullWidth
									placeholder={'Amount'}
									error={
										errors && touched.amount && errors.amount ? true : false
									}
									helperText={errors && touched.amount && errors.amount}
									type={'number'}
									value={amount}
									onChange={handleChange('amount')}
								/>
							</Box>
						)}
					</>
				)}
			</Box>
			{service !== SELECT_SERVICE && service !== FUND_WALLET_SERVICE.REFUND && (
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Reason
					</Typography>
					<TextInput
						placeholder={'Enter reason'}
						fullWidth
						multiline
						rows={3}
					/>
				</Box>
			)}
			<Box style={styles.btnWrapper}>
				<CustomButton
					loading={isLoading}
					onClick={(e: React.FormEvent<HTMLButtonElement>) => {
						e.preventDefault();
						handleSubmit();
					}}
					variant={'outlined'}
					size={'large'}
					style={styles.btnOutline}
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
