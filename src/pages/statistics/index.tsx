import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	Layout,
	SearchStatistics,
	StatisticTab,
	StatisticsTotal,
} from 'components';
import { BOX_SHADOW, RouteGuard, ADMIN_ROLE } from 'utilities';
import { usePageTitle } from 'hooks';

const Statistics = () => {
	usePageTitle('Statistics');
	return (
		<Layout>
			<RouteGuard
				roles={[
					ADMIN_ROLE.SUPER_ADMIN,
					ADMIN_ROLE.ADMIN,
					ADMIN_ROLE.OPERATIONS,
				]}
			>
				<Container>
					<Title variant={'h5'}>Statistics</Title>
					<SearchStatistics />
					<StatisticTab />
					<StatisticsContainer>
						<StatisticsTotal name={'Total  Revenue'} figure={123000} />
						<StatisticsTotal name={'Total  Transactions'} figure={123000} />
						<StatisticsTotal name={'Total  Data Revenue'} figure={123000} />
					</StatisticsContainer>
				</Container>
			</RouteGuard>
		</Layout>
	);
};

export default Statistics;

const StatisticsContainer = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gap: theme.spacing(3),
}));

const Container = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumn: '1fr',
	gap: theme.spacing(4),
	border: `0.5px solid ${theme.palette.secondary.main}`,
	padding: '1.5rem',
	backgroundColor: grey[50],
	borderRadius: theme.spacing(2),
	boxShadow: BOX_SHADOW,
}));

const Title = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
}));
