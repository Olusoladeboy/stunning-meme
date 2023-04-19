import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Layout } from '../../components';
import { BOX_SHADOW } from '../../utilities';

const Statistics = () => {
	return (
		<Layout>
			<Container>
				<Title variant={'h4'}>Statistics</Title>
			</Container>
		</Layout>
	);
};

export default Statistics;

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumn: '1fr',
	gap: theme.spacing(4),
	border: `0.5px solid ${theme.palette.secondary.main}`,
	padding: '1.5rem 0px',
	backgroundColor: grey[50],
	borderRadius: theme.spacing(2),
	boxShadow: BOX_SHADOW,
}));

const Title = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
}));
