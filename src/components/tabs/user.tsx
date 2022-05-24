import React, { CSSProperties } from 'react';
import { Box } from '@mui/material';
import Button from '../button';
import { LIGHT_PRIMARY_COLOR } from '../../utilities/constant';
import { UserNavList } from '../../utilities/types';

type Props = {
	handleChange: (value: string) => void;
};

const UserTab = ({ handleChange }: Props) => {
	const styles = useStyles();
	return (
		<Box
			sx={{
				display: 'flex',
				gap: '15px',
				button: {
					backgroundColor: '#CDD9F5',
				},
			}}
		>
			<Button
				onClick={() => handleChange(UserNavList.Profile)}
				style={styles.btn as CSSProperties}
				sx={{
					backgroundColor: `${LIGHT_PRIMARY_COLOR} !important`,
				}}
			>
				{UserNavList.Profile}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.Status)}
				style={styles.btn as CSSProperties}
			>
				{UserNavList.Status}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.Transaction)}
				style={styles.btn as CSSProperties}
			>
				{UserNavList.Transaction}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.WalletSummary)}
				style={styles.btn as CSSProperties}
			>
				{UserNavList.WalletSummary}
			</Button>
		</Box>
	);
};

const useStyles = () => ({
	btn: {
		borderRadius: '20px',
		padding: '4px 30px',
		// backgroundColor: '#CDD9F5',
		fontWeight: '600',
		textTransform: 'uppercase',
	},
});

export default UserTab;
