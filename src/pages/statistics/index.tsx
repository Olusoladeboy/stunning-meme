import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
	DataSubscriptionTable,
	Layout,
	SearchStatistics,
	StatisticTab,
	StatisticsTotal,
	AirtimePurchaseTable,
	ConversionsTable,
} from 'components';
import {
	BOX_SHADOW,
	RouteGuard,
	ADMIN_ROLE,
	SERVICES,
	Transaction,
} from 'utilities';
import { usePageTitle } from 'hooks';

type TDataStatistics = {
	service: string;
	data: { [key: string]: any }[];
};

const Statistics = () => {
	usePageTitle('Statistics');
	const [dataStatistics, setDataStatistics] = useState<null | TDataStatistics>(
		null
	);

	const handleSetDataStatistics = (data: TDataStatistics) => {
		setDataStatistics(data);
	};

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
					<Box
						sx={{
							padding: ['1.5rem'],
							display: 'grid',
							gap: (theme) => theme.spacing(4),
						}}
					>
						<Title variant={'h5'}>Statistics</Title>
						<SearchStatistics setDataStatistics={handleSetDataStatistics} />

						<StatisticTab />
						<StatisticsContainer>
							<StatisticsTotal name={'Total  Revenue'} figure={123000} />
							<StatisticsTotal name={'Total  Transactions'} figure={123000} />
							<StatisticsTotal name={'Total  Data Revenue'} figure={123000} />
						</StatisticsContainer>
					</Box>
					{dataStatistics && (
						<>
							{dataStatistics.service === SERVICES.DATA_SUBSCRIPTION && (
								<DataSubscriptionTable
									subscriptions={dataStatistics.data as any}
								/>
							)}
							{dataStatistics.service === SERVICES.AIRTIME_TOP_UP && (
								<AirtimePurchaseTable
									transactions={dataStatistics.data as any}
								/>
							)}
							{dataStatistics.service === SERVICES.AIRTIME_CONVERSION && (
								<ConversionsTable conversions={dataStatistics.data as any} />
							)}
						</>
					)}
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
	padding: '1.5rem 0px',
	backgroundColor: grey[50],
	borderRadius: theme.spacing(2),
	boxShadow: BOX_SHADOW,
}));

const Title = styled(Typography)(({ theme }) => ({
	fontWeight: 'bold',
}));
