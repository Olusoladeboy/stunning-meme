import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

const ForgetPasswordForm = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<Typography style={styles.title} variant={'h5'}>
					Forget Password?
				</Typography>
				<Typography variant={'body1'}>
					Reset password in two quick steps
				</Typography>
			</Box>
			<Box>
				<TextInput fullWidth placeholder={'Email or phone number'} />
			</Box>
			<Button size={'large'} style={styles.btn as any}>
				Reset password
			</Button>
			<Button onClick={() => navigate(-1)}>Back</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	title: {
		marginBottom: '6px',
		fontWeight: '600',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		textTransform: 'uppercase',
		fontSize: '14px',
	},
	endAdornmentBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
});

export default ForgetPasswordForm;
