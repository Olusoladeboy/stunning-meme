import React, { CSSProperties } from 'react';
import { Box } from '@mui/material';
import Button from '../button';
import { LIGHT_PRIMARY_COLOR, UserNavList } from 'utilities';

type Props = {
	handleChange: (value: string) => void;
	currentTab: string;
};

const TabItem = ({
	label,
	currentTab,
	handleChange,
}: {
	label: `${UserNavList}`;
	currentTab: string;
	handleChange: (tab: string) => void;
}) => {
	const styles = useStyles();
	return (
		<Button
			onClick={() => handleChange(UserNavList.Profile)}
			style={
				{
					...styles.btn,
					backgroundColor:
						currentTab === label ? `${LIGHT_PRIMARY_COLOR}` : '#CDD9F5',
				} as CSSProperties
			}
		>
			{label}
		</Button>
	);
};

const BusinessTab = ({ handleChange, currentTab }: Props) => {
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
			<TabItem
				handleChange={() => handleChange(UserNavList.Profile)}
				label='profile'
				currentTab={currentTab}
			/>

			<TabItem
				handleChange={() => handleChange(UserNavList.Commissions)}
				label='commissions'
				currentTab={currentTab}
			/>
			<TabItem
				handleChange={() => handleChange(UserNavList.Service)}
				label='services'
				currentTab={currentTab}
			/>
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

export default BusinessTab;
