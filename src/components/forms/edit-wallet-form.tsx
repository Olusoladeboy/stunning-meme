import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography, MenuItem } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import Select from '../form-components/Select';

const EditWalletForm = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: '3fr 7fr',
					},
					gap: theme.spacing(4),
				}}
			>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Condition
					</Typography>
					<Select fullWidth>
						<MenuItem disabled>Select wallet type</MenuItem>
						<MenuItem>Credit</MenuItem>
						<MenuItem>Debit</MenuItem>
					</Select>
				</Box>
				<Box>
					<Typography variant={'body1'} style={styles.label}>
						Amount
					</Typography>
					<TextInput fullWidth placeholder={'Amount'} />
				</Box>
			</Box>
			<Box style={styles.btnWrapper}>
				<Button variant={'outlined'} size={'large'} style={styles.btnOutline}>
					Update
				</Button>
				<Button size={'large'} style={styles.btn}>
					Done
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

	label: {
		display: 'block',
		marginBottom: theme.spacing(1),
	},
	btnWrapper: {
		display: 'flex',
		gap: theme.spacing(3),
		alignSelf: 'flex-end',
		marginTop: theme.spacing(4),
	},
	btn: {
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '120px',
	},
	btnOutline: {
		// color: grey[50],
		fontWeight: '600',
		alignSelf: 'flex-end',
		minWidth: '120px',
		borderColor: theme.palette.primary.color,
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

export default EditWalletForm;
