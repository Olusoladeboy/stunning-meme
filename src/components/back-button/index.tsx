import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

type Props = {
	text?: string;
};

const BackButton = ({ text }: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box onClick={() => navigate(-1)} style={styles.container}>
			<ArrowBack />
			<Typography variant={'h5'} style={styles.text}>
				{text || 'Back'}
			</Typography>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(2),
		cursor: 'pointer',
	},
	text: {
		fontWeight: '600',
	},
});

export default BackButton;
