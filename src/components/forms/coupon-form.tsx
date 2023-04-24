import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
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
} from '../../utilities';
import { useAlert, useHandleError } from '../../hooks';
import { createCoupon, updateCoupon } from '../../api';

const COUPON_TYPES = [CouponType.PERCENT, CouponType.AMOUNT];
const COUPON_STATUS = [
	CouponStatus.VERIFIED,
	CouponStatus.UNVERIFIED,
	CouponStatus.CANCELLED,
	CouponStatus.EXPIRED,
];

type Props = {
	data?: Coupon;
	isEdit?: boolean;
	onSuccess?: () => void;
};

const SELECT_COUPON_TYPE = 'Select coupon type';
const SELECT_COUPON_STATUS = 'Select coupon status';

const CouponForm = ({ data, isEdit, onSuccess }: Props) => {
	const theme = useTheme();
	const handleError = useHandleError();
	const queryClient = useQueryClient();
	const setAlert = useAlert();
	const styles = useStyles(theme);
	const initialValues: Coupon = {
		code: '',
		type: SELECT_COUPON_TYPE,
		expiresIn: '',
		gift: '',
		status: SELECT_COUPON_STATUS,
	};

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

	const { values, handleChange, errors, touched, handleSubmit } = useFormik({
		initialValues: data
			? {
					...data,
					expiresIn: moment.utc(data.expiresIn).format('yyyy-MM-DD'),
					gift:
						typeof data.gift === 'string'
							? data.gift
							: data.gift?.$numberDecimal,
			  }
			: initialValues,
		validationSchema: isEdit
			? validationSchema.EditCoupon
			: validationSchema.Coupon,
		onSubmit: (values) => {
			if (isEdit) {
				return mutateUpdateCoupon({
					data: {
						type: values.type,
						gift: values.gift,
					},
					id: data?.id as string,
				});
			}
			mutateCreateCoupon({
				code: values.code,
				type: values.type,
				expiresIn: values.expiresIn,
				gift: values.gift,
			});
		},
	});

	return (
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
						{COUPON_TYPES.map((coupon, key) => (
							<MenuItem key={key} value={coupon}>
								{coupon}
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
					/>
				</Box>
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
						{COUPON_STATUS.map((status, key) => (
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
