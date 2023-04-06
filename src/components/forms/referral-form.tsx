import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

type Props = {
	data?: { [key: string]: any };
	isEdit?: boolean;
};

const ReferralForm = ({ data, isEdit }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const initialValues: { [key: string]: any } = {
		referral_bonus: '',
		transaction_limit: '',
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
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Referral Bonus
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Referral bonus'}
						value={values.referral_bonus}
						onChange={handleChange('referral_bonus')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Transaction Limit
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Transaction Limit'}
						value={values.transaction_limit}
						onChange={handleChange('transaction_limit')}
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
		justifyContent: 'space-between',
		gap: '20px',
		height: '420px',
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

export default ReferralForm;
