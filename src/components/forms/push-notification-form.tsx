import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Select from '../form-components/Select';

type Props = {
	isEdit?: boolean;
	data?: any;
};

const PushNotificationForm = ({ isEdit }: Props) => {
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
						Select User
					</Typography>
					<TextInput fullWidth placeholder={'Search User'} />
				</Box>
				<Button size={'large'} style={styles.uploadCsvBtn as CSSProperties}>
					Upolad CSV
				</Button>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Title
					</Typography>
					<TextInput fullWidth placeholder={'Plan amount'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Click action
					</Typography>
					<TextInput fullWidth placeholder={'Click Action'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Body
					</Typography>
					<TextInput fullWidth multiline rows={5} placeholder={'Body'} />
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Device
					</Typography>
					<Select fullWidth>
						<MenuItem disabled>Select device</MenuItem>
					</Select>
				</Box>
			</Box>
			<Button size={'large'} style={styles.btn as CSSProperties}>
				{isEdit ? 'Save' : 'Send notification'}
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
		textTransform: 'uppercase',
		alignSelf: 'flex-end',
		minWidth: '140px',
		marginTop: '3rem',
	},
	endAdornmentBtn: {
		color: theme.palette.secondary.main,
		fontWeight: '600',
		fontSize: '12px',
		padding: '0px',
		minWidth: 'unset',
	},
	uploadCsvBtn: {
		alignSelf: 'flex-end',
		justifySelf: 'flex-start',
		width: '70%',
		color: theme.palette.secondary.main,
		border: `1px solid ${theme.palette.secondary.main}`,
		textTransform: 'uppercase',
	},
});

export default PushNotificationForm;
