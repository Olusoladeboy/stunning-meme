import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

const EditProfileForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
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
						Full Name
					</Typography>
					<TextInput fullWidth placeholder={'Fullname'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Username
					</Typography>
					<TextInput fullWidth placeholder={'username'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Email
					</Typography>
					<TextInput fullWidth placeholder={'Email'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Phone number
					</Typography>
					<TextInput fullWidth placeholder={'phone number'} />
				</Box>
			</Box>
			<Button size={'large'} style={styles.btn}>
				Update
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

export default EditProfileForm;
