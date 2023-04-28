import React, { CSSProperties, SyntheticEvent, useState } from 'react';
import {
	Box,
	useTheme,
	Typography,
	MenuItem,
	SelectChangeEvent,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import CustomButton from '../button/custom-button';
import { grey, red } from '@mui/material/colors';
import Select from '../form-components/select';
import { User, QueryKeys, FUND_WALLET_SERVICE } from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { transactUser } from '../../api';
import { Close, Search } from '@mui/icons-material';
import { useSearchTransaction } from '../../hooks';

type Props = {
	user: User | null;
	close?: () => void;
};

interface InitialValues {
	type?: string;
	amount?: string;
	reference?: string;
	summary?: string;
}

const SELECT_CONDITION = 'Select condition';

const VALIDATION_SCHEMA = {
	Refund: 'Refund',
	Other: 'Other',
};

const EditWalletForm = ({ user, close }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const styles = useStyles(theme);
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const [isTransact, setTransact] = useState<boolean>(false);
	const [validationSchema, setValidationSchema] = useState<string>('');

	//Search Transaction Hooks
	const { search, searchTransaction, isSearching, clearSearch } =
		useSearchTransaction(() =>
			setAlert({ message: 'Tansaction reference confirm', type: 'info' })
		);

	const refundValidationSchema = yup.object().shape({
		type: yup
			.string()
			.notOneOf([SELECT_CONDITION], 'Select Conditon')
			.required('Select Condition'),
		reference: yup.string().required('Enter related transaction reference'),
	});

	const otherValidationSchema = yup.object().shape({
		type: yup
			.string()
			.notOneOf([SELECT_CONDITION], 'Select Conditon')
			.required('Select Condition'),
		amount: yup.number().required('Specify amount'),
		summary: yup.string().required('Specify reason for this transact'),
	});

	const { isLoading, mutate: mutateTransactUser } = useMutation(transactUser, {
		onSettled: (data, error) => {
			if (error) {
				const response = handleError({ error });
				if (response?.message) {
					setAlert({ message: response.message, type: 'error' });
				}
			}

			if (data && data.success) {
				setTransact(true);
				resetForm();
				setAlert({ message: 'Transact is successful!', type: 'success' });
				queryClient.invalidateQueries(QueryKeys.User);
				queryClient.invalidateQueries(QueryKeys.UserWallet);
				queryClient.invalidateQueries(QueryKeys.UserWalletTransaction);
			}
		},
	});

	const initialValues: InitialValues = {
		type: SELECT_CONDITION,
		amount: '',
		reference: '',
		summary: '',
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
		validationSchema:
			validationSchema === VALIDATION_SCHEMA.Refund
				? refundValidationSchema
				: otherValidationSchema,
		onSubmit: (values) => {
			let data = { type: values.type } as { [key: string]: any };
			if (values.type === FUND_WALLET_SERVICE.REFUND) {
				if (!search)
					return setAlert({
						message: 'Confirm related transaction reference',
						type: 'info',
					});

				if (search && values.reference !== search[0].reference)
					return setAlert({
						message: 'Transaction reference do not match',
						type: 'info',
					});

				data.relatedTransactionReference = values.reference;
				return mutateTransactUser({
					id: user?.id as string,
					data,
				});
			}

			data.amount = values.amount;
			data.summary = values.summary;

			mutateTransactUser({
				id: user?.id as string,
				data,
			});
		},
	});

	const { amount, type, reference, summary } = values;

	const closeModal = () => {
		setTransact(false);
		clearSearch();
		typeof close !== 'undefined' && close();
	};

	/*
	 *Clear Reference
	 */
	const clearReference = () => {
		setFieldValue('reference', '');
		clearSearch();
	};

	/*
	 * Search Transaction by Reference
	 */
	const handleSearchTransaction = () => {
		searchTransaction(reference as string);
	};

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: type === SELECT_CONDITION ? '1fr' : '3fr 7fr',
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
						error={errors && touched.type && errors.type ? true : false}
						helpertext={errors && touched.type && errors.type}
						value={type}
						onChange={(e: SelectChangeEvent<unknown>) => {
							const value = e.target.value;
							setTransact(false);
							setFieldValue('type', value);
							const schema =
								value === FUND_WALLET_SERVICE.REFUND
									? VALIDATION_SCHEMA.Refund
									: VALIDATION_SCHEMA.Other;
							setValidationSchema(schema);
						}}
					>
						<MenuItem disabled value={SELECT_CONDITION}>
							{SELECT_CONDITION}
						</MenuItem>
						{Object.values(FUND_WALLET_SERVICE).map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</Box>
				{type !== SELECT_CONDITION && (
					<>
						{type === FUND_WALLET_SERVICE.REFUND ? (
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
									value={reference}
									onChange={handleChange('reference')}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												{isSearching ? (
													<CircularProgress size={16} />
												) : (
													reference && (
														<Box
															sx={{
																display: 'flex',
																alignItems: 'center',
																gap: '3px',
															}}
														>
															<IconButton
																sx={{
																	color: red['600'],
																}}
																onClick={clearReference}
																size={'small'}
															>
																<Close />
															</IconButton>

															<IconButton
																onClick={handleSearchTransaction}
																size={'small'}
															>
																<Search />
															</IconButton>
														</Box>
													)
												)}
											</InputAdornment>
										),
									}}
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
			{type !== SELECT_CONDITION && type !== FUND_WALLET_SERVICE.REFUND && (
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Reason
					</Typography>
					<TextInput
						placeholder={'Enter reason'}
						fullWidth
						multiline
						rows={3}
						value={summary}
						onChange={handleChange('summary')}
						error={errors && touched.summary && errors.summary ? true : false}
						helperText={errors && touched.summary && errors.summary}
					/>
				</Box>
			)}
			<Box style={styles.btnWrapper}>
				{!isTransact && (
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
				)}
				<Button
					onClick={(e: SyntheticEvent) => {
						e.preventDefault();
						closeModal();
					}}
					size={'large'}
					style={styles.btn}
				>
					Close
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
