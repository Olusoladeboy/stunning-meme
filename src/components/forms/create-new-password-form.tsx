import React from 'react';
import { Box, useTheme, InputAdornment, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

const CreateNewPasswordForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.form as any} component={'form'}>
			<Typography style={styles.title as any} variant={'h5'}>
				Create new password
			</Typography>
			<Box>
				<TextInput
					fullWidth
					placeholder={'New Password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<Button disableRipple style={styles.endAdornmentBtn}>
									show
								</Button>
							</InputAdornment>
						),
					}}
				/>
			</Box>

			<Box>
				<TextInput
					fullWidth
					placeholder={'Confirm Password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position='start'>
								<Button disableRipple style={styles.endAdornmentBtn}>
									show
								</Button>
							</InputAdornment>
						),
					}}
				/>
			</Box>

			<Button size={'large'} style={styles.btn as any}>
				Confirm
			</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	title: {
		fontWeight: '600',
		textTransform: 'capitalize',
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
	},
	endAdornmentBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
});

export default CreateNewPasswordForm;
