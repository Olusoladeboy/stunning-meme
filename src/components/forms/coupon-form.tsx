import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Select from '../form-components/Select';

type Props = {
	data?: { [key: string]: any };
	isEdit?: boolean;
};

const CouponForm = ({ data, isEdit }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	console.log(data);

	const initialValues: { [key: string]: any } = {
		coupon_name: '',
		date: '',
		expiration: '',
		gift: '',
		status: '',
		type: '',
	};

	const { values, handleChange } = useFormik({
		initialValues: data ? data : initialValues,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
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
						Coupon Name
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Coupon name'}
						value={values.coupon_name}
						onChange={handleChange('coupon_name')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Coupon code
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Coupon code'}
						value={values.code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Coupon type
					</Typography>
					<Select fullWidth>
						<MenuItem disabled>Select coupon type</MenuItem>
					</Select>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Gift
					</Typography>
					<Select fullWidth>
						<MenuItem disabled>Select Gift</MenuItem>
					</Select>
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
						placeholder={'Expiration date'}
						value={values.expiration}
						onChange={handleChange('expiration')}
					/>
				</Box>
				<Box sx={{ display: isEdit ? 'block' : 'none' }}>
					<Typography variant={'body1'} style={styles.label}>
						Status
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Status'}
						value={values.status}
						onChange={handleChange('status')}
					/>
				</Box>
			</Box>
			<Button size={'large'} style={styles.btn}>
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
