import React, { CSSProperties } from 'react';
import { Box, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import Button from '../button';
import AvaliableNetworkItem from './available-network-item';

const AvailableNetwork = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box style={styles.container}>
			<Box style={styles.main}>
				<AvaliableNetworkItem name={'MTN'} value={18} />
				<AvaliableNetworkItem name={'Airtel'} value={18} />
				<AvaliableNetworkItem name={'(9Mobile)'} value={18} />
				<AvaliableNetworkItem name={'Glo'} value={18} />
			</Box>
			<Button style={styles.editBtn as CSSProperties}>Edit Network</Button>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		backgroundColor: '#3D3D3D',
		padding: `1.5rem 1rem`,
		borderRadius: theme.spacing(2),
		color: grey[50],
		display: 'flex',
		gap: theme.spacing(2),
		justifyContent: 'space-between',
		// alignItems: 'flex-end',
	},
	main: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		alignItems: 'center',
		justifyContent: 'space-between',
		rowGap: theme.spacing(3),
		columnGap: theme.spacing(2),
	},
	verticalLine: {
		width: '3px',
		minHeight: '100%',
		backgroundColor: grey[50],
	},
	editBtn: {
		backgroundColor: 'unset',
		border: `1px solid ${grey[50]}`,
		whiteSpace: 'nowrap',
		color: grey[50],
		fontSize: '12px',
		textTransform: 'uppercase',
		alignSelf: 'flex-end',
	},
});

export default AvailableNetwork;
