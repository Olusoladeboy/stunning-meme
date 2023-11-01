import React, { CSSProperties, useEffect } from 'react';
import {
	Box,
	useTheme,
	Typography,
	MenuItem,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import TextInput from '../form-components/TextInput';
import Button from '../button/custom-button';
import Select from '../form-components/select';
import {
	Coupon,
	CouponType,
	CouponStatus,
	QueryKey,
	validationSchema,
	PRIMARY_COLOR,
} from 'utilities';
import { useAlert, useHandleError, useSearchUser } from 'hooks';
import { createCoupon, updateCoupon } from 'api';
import SearchInput from 'components/form-components/search-input';
import Loader from 'components/loader';

type Props = {
	data?: Coupon;
	isEdit?: boolean;
	onSuccess?: () => void;
};

const UserType = {
	ALL: 'ALL',
	INDIVIDUAL: 'INDIVIDUAL',
};

const SELECT_COUPON_TYPE = 'Select coupon type';
const SELECT_COUPON_STATUS = 'Select coupon status';
const SELECT_USER_TYPE = 'Select user type';

const CouponForm = ({ data, isEdit, onSuccess }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const styles = useStyles(theme);

	const { isSearching, search, clearSearch, searchUser } = useSearchUser();

	const initialValues: Partial<Coupon> = {
		code: '',
		type: SELECT_COUPON_TYPE,
		expiresIn: '',
		gift: '',
		status: SELECT_COUPON_STATUS,
		couponUserType: SELECT_USER_TYPE,
		usage: '',
		user: '',
	};

	const foundUser = search && Array.isArray(search) && search[0];

	const { mutate: mutateCreateCoupon, isLoading: isCreatingCoupon } =
		useMutation(createCoupon, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKey.Coupon);
					setAlert({
						message: 'Coupon created successfully!',
						type: 'success',
					});
					typeof onSuccess !== 'undefined' && onSuccess();
				}
			},
		});

	const { mutate: mutateUpdateCoupon, isLoading: isUpdatingCoupon } =
		useMutation(updateCoupon, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message) {
						setAlert({ message: response.message, type: 'error' });
					}
				}

				if (data && data.success) {
					queryClient.invalidateQueries(QueryKey.Coupon);
					setAlert({
						message: 'Coupon updated successfully!',
						type: 'success',
					});
					typeof onSuccess !== 'undefined' && onSuccess();
				}
			},
		});

	const {
		values,
		handleChange,
		errors,
		touched,
		handleSubmit,
		setFieldValue,
		setValues,
	} = useFormik({
		initialValues,
		validationSchema: isEdit
			? validationSchema.EditCoupon
			: validationSchema.Coupon,
		onSubmit: (values) => {
			const payload: Record<string, any> = {
				code: values.code,
				type: values.type,
				expiresIn: values.expiresIn,
				gift: values.gift,
				couponUserType: values.couponUserType,
				usage: values.usage,
			};

			if (values.user) payload.user = values.user;

			if (isEdit) {
				return mutateUpdateCoupon({
					data: {
						type: values.type,
						gift: values.gift,
					},
					id: data?.id as string,
				});
			}

			mutateCreateCoupon(payload);
		},
	});

	useEffect(
		() => {
			setFieldValue('user', foundUser);

			if (data) {
				const {
					expiresIn,
					gift,
					code,
					usage,
					couponUserType,
					type,
					user,
					status,
				} = data;

				const values = {
					code,
					usage,
					couponUserType,
					type,
					user,
					status,
					expiresIn: moment.utc(expiresIn).format('yyyy-MM-DD'),
					gift: typeof gift === 'string' ? gift : gift?.$numberDecimal,
				};

				setValues(values);
			}
		},
		// eslint-disable-next-line
		[foundUser, data]
	);

	return (
		<>
			{isSearching && <Loader />}
			<Box style={styles.form as CSSProperties} component={'form'}>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Coupon Code
					</Typography>
					<TextInput
						disabled={isEdit ? true : false}
						fullWidth
						error={errors.code && touched.code ? true : false}
						helperText={errors && touched.code && errors.code}
						placeholder={'Coupon Code'}
						value={values.code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						User type
					</Typography>
					<Select
						fullWidth
						error={
							errors.couponUserType && touched.couponUserType ? true : false
						}
						helpertext={
							errors && touched.couponUserType && errors.couponUserType
						}
						value={values.couponUserType}
						onChange={handleChange('couponUserType') as never}
					>
						<MenuItem value={SELECT_USER_TYPE} disabled>
							{SELECT_USER_TYPE}
						</MenuItem>
						{Object.values(UserType).map((value) => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</Box>
				{values.couponUserType === UserType.INDIVIDUAL && (
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							User
						</Typography>
						{foundUser ? (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									border: `1px solid ${PRIMARY_COLOR}`,
									borderRadius: '6px',
									padding: '6px 12px',
								}}
							>
								<Typography variant={'body1'}>
									{foundUser.firstname} {foundUser.lastname}
								</Typography>
								<IconButton onClick={clearSearch} size={'small'}>
									<Close />
								</IconButton>
							</Box>
						) : (
							<SearchInput
								borderRadius='6px'
								fullWidth
								placeholder='Search user by email'
								clearSearch={clearSearch}
								handleSearch={searchUser}
							/>
						)}
					</Box>
				)}
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: 'repeat(2, 1fr)',
						},
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Coupon type
						</Typography>
						<Select
							fullWidth
							error={errors.type && touched.type ? true : false}
							helpertext={errors && touched.type && errors.type}
							value={values.type}
							onChange={handleChange('type') as never}
						>
							<MenuItem value={SELECT_COUPON_TYPE} disabled>
								{SELECT_COUPON_TYPE}
							</MenuItem>
							{Object.values(CouponType).map((value) => (
								<MenuItem key={value} value={value}>
									{value}
								</MenuItem>
							))}
						</Select>
					</Box>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Gift
						</Typography>
						<TextInput
							type={'number'}
							error={errors.gift && touched.gift ? true : false}
							helperText={errors && touched.gift && errors.gift}
							fullWidth
							placeholder={'Gift'}
							value={values.gift}
							onChange={handleChange('gift')}
							InputProps={{
								endAdornment: CouponType.PERCENT === values.type && (
									<InputAdornment position='end'>%</InputAdornment>
								),

								startAdornment: CouponType.AMOUNT === values.type && (
									<InputAdornment position='start'>₦</InputAdornment>
								),
							}}
						/>
					</Box>
				</Box>

				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Usage
					</Typography>
					<TextInput
						fullWidth
						type={'number'}
						error={Boolean(errors.usage && touched.usage)}
						helperText={errors && touched.usage && errors.usage}
						placeholder={'Enter usage'}
						value={values.usage}
						onChange={handleChange('usage')}
					/>
				</Box>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: isEdit ? 'repeat(2, 1fr)' : '1fr',
						},
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Expiration Date
						</Typography>
						<TextInput
							fullWidth
							disabled={isEdit ? true : false}
							error={errors.expiresIn && touched.expiresIn ? true : false}
							helperText={errors && touched.expiresIn && errors.expiresIn}
							type={'date'}
							placeholder={'Expiration date'}
							value={values.expiresIn}
							onChange={handleChange('expiresIn')}
						/>
					</Box>
					<Box sx={{ display: isEdit ? 'block' : 'none' }}>
						<Typography variant={'body1'} style={styles.label}>
							Status
						</Typography>
						<Select
							fullWidth
							disabled={isEdit ? true : false}
							error={errors.status && touched.status ? true : false}
							helpertext={errors && touched.status && errors.status}
							value={values.status}
							onChange={handleChange('status') as never}
						>
							<MenuItem value={SELECT_COUPON_STATUS} disabled>
								{SELECT_COUPON_STATUS}
							</MenuItem>
							{Object.values(CouponStatus).map((status, key) => (
								<MenuItem key={key} value={status}>
									{status}
								</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
				<Button
					loading={isCreatingCoupon || isUpdatingCoupon}
					size={'large'}
					style={styles.btn}
					onClick={(e: React.FormEvent<HTMLButtonElement>) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					Save
				</Button>
			</Box>
		</>
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

export default CouponForm;
