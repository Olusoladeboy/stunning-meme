import React from 'react';
import { Box, useTheme, InputAdornment, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Link from '../link';
import LINKS from '../../utilities/links';

const LoginForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.form as any} component={'form'}>
			<Box>
				<TextInput fullWidth placeholder={'Username'} />
			</Box>

			<Box>
				<TextInput
					fullWidth
					placeholder={'Password'}
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
				<Link to={LINKS.ForgetPassword}>
					<Typography style={styles.link}>Forget Password?</Typography>
				</Link>
			</Box>

			<Button size={'large'} style={styles.btn}>
				Login
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
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
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

export default LoginForm;
