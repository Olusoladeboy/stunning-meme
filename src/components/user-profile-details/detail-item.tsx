import React, { ReactNode, CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
	text: string;
	value: ReactNode;
};

const DetailItem = ({ text, value }: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box
			sx={{
				display: 'grid',
				alignItems: 'center',
				gridTemplateColumns: '3.5fr 6.5fr',
			}}
		>
			<Typography style={styles.text as CSSProperties} variant={'body1'}>
				{text}
			</Typography>
			{typeof value === 'string' ? (
				<Typography variant={'body1'}>{value}</Typography>
			) : (
				<>{value}</>
			)}
		</Box>
	);
};

const useStyles = (theme: any) => ({
	text: {
		fontWeight: '600',
		textTransform: 'uppercase',
	},
});

export default DetailItem;
