import React, { ReactNode } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

type Props = {
	icon: any;
	amount: string | number;
	children: ReactNode;
	bgColor?: string;
	amountColor?: string;
	isBorder?: boolean;
	borderColor?: string;
	onClick?: () => void;
};

const TransactionItem = ({
	icon,
	amount,
	children,
	bgColor,
	isBorder,
	borderColor,
	amountColor,
	onClick,
}: Props) => {
	const theme = useTheme();
	return (
		<Box
			onClick={onClick}
			sx={{
				backgroundColor: bgColor || grey[50],
				minWidth: '200px',
				cursor: 'pointer',
				borderRadius: theme.spacing(2),
				padding: theme.spacing(3),
				border: isBorder
					? `1px solid ${borderColor || theme.palette.primary.main}`
					: undefined,
			}}
		>
			{icon}
			<Typography
				sx={{
					fontWeight: '600',
					color: amountColor || theme.palette.primary.main,
				}}
				variant={'h5'}
			>
				{amount}
			</Typography>
			<Box>{children}</Box>
		</Box>
	);
};

export default TransactionItem;
