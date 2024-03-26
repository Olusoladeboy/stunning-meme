import React, { CSSProperties } from 'react';
import { Box } from '@mui/material';
import Button from '../button';
import { LIGHT_PRIMARY_COLOR, UserNavList } from 'utilities';

type Props = {
	handleChange: (value: string) => void;
	currentTab: string;
};

const UserTab = ({ handleChange, currentTab }: Props) => {
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
				style={
					{
						...styles.btn,
						backgroundColor:
							currentTab === UserNavList.Profile
								? `${LIGHT_PRIMARY_COLOR}`
								: '#CDD9F5',
					} as CSSProperties
				}
			>
				{UserNavList.Profile}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.Status)}
				style={
					{
						...styles.btn,
						backgroundColor:
							currentTab === UserNavList.Status
								? `${LIGHT_PRIMARY_COLOR}`
								: '#CDD9F5',
					} as CSSProperties
				}
			>
				{UserNavList.Status}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.Transaction)}
				style={
					{
						...styles.btn,
						backgroundColor:
							currentTab === UserNavList.Transaction
								? `${LIGHT_PRIMARY_COLOR}`
								: '#CDD9F5',
					} as CSSProperties
				}
			>
				{UserNavList.Transaction}
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.WalletSummary)}
				style={
					{
						...styles.btn,
						backgroundColor:
							currentTab === UserNavList.WalletSummary
								? `${LIGHT_PRIMARY_COLOR}`
								: '#CDD9F5',
					} as CSSProperties
				}
			>
				Wallet Summary
			</Button>
			<Button
				onClick={() => handleChange(UserNavList.Manager)}
				style={
					{
						...styles.btn,
						backgroundColor:
							currentTab === UserNavList.Manager
								? `${LIGHT_PRIMARY_COLOR}`
								: '#CDD9F5',
					} as CSSProperties
				}
			>
				{UserNavList.Manager}
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
