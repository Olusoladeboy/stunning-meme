import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, Switch } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';

const SuspendUserForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box component={'form'}>
			<Box style={styles.switchWrapper}>
				<Typography style={styles.text as CSSProperties}>
					Suspend user
				</Typography>
				<Switch />
			</Box>
			<Box style={styles.formWrapper as CSSProperties}>
				<Box>
					<TextInput fullWidth placeholder={'Enter duration (in days)'} />
				</Box>

				<Box>
					<TextInput
						multiline={true}
						rows={4}
						fullWidth
						placeholder={'Enter suspension note'}
					/>
				</Box>

				<Button size={'large'} style={styles.btn}>
					Suspend user
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
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	switchWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(1),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '140px',
	},
	text: {
		fontWeight: '600',
		textTransform: 'capitalize',
	},
});

export default SuspendUserForm;
