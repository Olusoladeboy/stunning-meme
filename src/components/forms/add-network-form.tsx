import React, { CSSProperties } from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import TextInput from '../form-components/TextInput';
import Button from '../button';
import { grey } from '@mui/material/colors';
import { NetworkPageTypes } from '../../utilities/types';

type Props = {
	type: NetworkPageTypes.DATA_NETWORK | NetworkPageTypes.AIRTIME_NETWORK;
};

const AddNetworkForm = ({ type }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.form as CSSProperties} component={'form'}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr',
					gap: theme.spacing(4),
				}}
			>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
						gap: theme.spacing(4),
					}}
				>
					<Box>
						<Typography variant={'body1'} style={styles.label}>
							Network Name
						</Typography>
						<TextInput fullWidth placeholder={'Network name'} />
					</Box>
					<Box
						sx={{
							display:
								type === NetworkPageTypes.AIRTIME_NETWORK ? 'block' : 'none',
						}}
					>
						<Typography variant={'body1'} style={styles.label}>
							USSD code
						</Typography>
						<TextInput fullWidth placeholder={'ussd code'} />
					</Box>
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
		height: '320px',
		justifyContent: 'space-between',
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

export default AddNetworkForm;
