import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { useFormik } from 'formik';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

type Props = {
	data?: { [key: string]: any };
};

const DataPlanForm = ({ data }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);

	const initialValues: { [key: string]: any } = {
		amount: '',
		code: '',
		plan_name: '',
		shortcode: '',
		shortcode_sms: '',
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
						Data Name
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Data name'}
						value={values.plan_name}
						onChange={handleChange('plan_name')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Plan Amount
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Plan amount'}
						value={values.amount}
						onChange={handleChange('amount')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Plan Code
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Plan Code'}
						value={values.code}
						onChange={handleChange('code')}
					/>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Shortcode
					</Typography>
					<TextInput
						fullWidth
						placeholder={'Shortcode'}
						value={values.shortcode}
						onChange={handleChange('shortcode')}
					/>
				</Box>
			</Box>
			<Box>
				<Typography variant={'body1'} style={styles.label}>
					Shortcode sms
				</Typography>
				<TextInput
					fullWidth
					placeholder={'Shortcode sms'}
					value={values.shortcode_sms}
					onChange={handleChange('shortcode_sms')}
				/>
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

export default DataPlanForm;
