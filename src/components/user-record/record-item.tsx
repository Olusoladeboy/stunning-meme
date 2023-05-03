import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import Link from '../link';
import { grey } from '@mui/material/colors';

type Props = {
	isBorderRight?: boolean;
	isBorderBottom?: boolean;
	isBorderTop?: boolean;
	isBorderLeft?: boolean;
	text: string;
	textColor?: string;
	value: string | number;
	link?: string;
	isPaddingRight?: boolean;
	isPaddingLeft?: boolean;
	isPaddingTop?: boolean;
	isPaddingBottom?: boolean;
};

const RecordItem = ({
	text,
	textColor,
	value,
	isBorderBottom,
	isBorderLeft,
	isBorderRight,
	isBorderTop,
	isPaddingRight,
	isPaddingBottom,
	isPaddingLeft,
	isPaddingTop,
	link,
}: Props) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				borderRight: isBorderRight ? `1px solid ${grey[300]}` : undefined,
				borderLeft: isBorderLeft ? `1px solid ${grey[300]}` : undefined,
				borderBottom: isBorderBottom ? `1px solid ${grey[300]}` : undefined,
				borderTop: isBorderTop ? `1px solid ${grey[300]}` : undefined,
				padding: '2rem 15px',
				paddingLeft: isPaddingLeft ? '2rem' : undefined,
				paddingRight: isPaddingRight ? '2rem' : undefined,
				paddingBottom: isPaddingBottom ? '2rem' : undefined,
				paddingTop: isPaddingTop ? '2rem' : undefined,
			}}
		>
			<Typography
				sx={{ fontWeight: '600', color: textColor }}
				variant={'body1'}
			>
				{text}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
				}}
			>
				<Typography variant={'h4'}>{value}</Typography>
				<Link
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
						color: theme.palette.secondary.main,
					}}
					to={link || ''}
				>
					<Typography variant={'body1'}>view</Typography>
					<ArrowForwardIos sx={{ fontSize: '13px' }} />
				</Link>
			</Box>
		</Box>
	);
};

export default RecordItem;
