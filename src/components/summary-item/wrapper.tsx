import React, { ReactNode } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
	icon: any;
	amount: string;
	children: ReactNode;
	bgColor?: string;
};

const SummaryWrapper = ({ icon, amount, children, bgColor }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box
			sx={{
				backgroundColor: bgColor || grey[50],
				borderRadius: theme.spacing(2),
				padding: theme.spacing(3),
			}}
		>
			{icon}
			<Typography style={styles.amountText} variant={'h5'}>
				{amount}
			</Typography>
			<Box>{children}</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	amountText: {
		fontWeight: '600',
		color: grey[50],
	},
});

export default SummaryWrapper;
