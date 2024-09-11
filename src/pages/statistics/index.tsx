import React, { useState, useRef } from 'react';
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
	CableTransactionsTable,
	InternetTransactionsTable,
	EducationTransactionsTable,
	ElectricityTransactionsTable,
	WalletTransferTransactionsTable,
	WithdrawalTransactionsTable,
	AutoAirtimeConversionTransactionsTable,
	CardTopUpTransactionsTable,
	BettingTransactionsTable,
	EPinTransactionsTable,
	ReversalTransactionsTable,
	TablePagination,
	RTransactionTable,
	GiftcardESimTransactionTable,
	CreditDebitTable,
} from 'components';
import {
	BOX_SHADOW,
	RouteGuard,
	ADMIN_ROLE,
	SERVICES,
	Metadata,
	IPurchasedBill,
	IWithdrawal,
	ITransfer,
	STATISTIC_TAB,
	getFilterDateRange,
	Transaction,
} from 'utilities';
import {
	usePageTitle,
	useQueryAirtimeTransactions,
	useQueryWalletWithdrawals,
	useQueryConvertAirtimes,
	useQueryAutoConvertAirtimes,
	useQueryDataSubscriptions,
	useQueryBillTransactions,
	useQueryEPinTransactions,
	useQueryWalletFundings,
	useQueryWalletTransfers,
	useQueryGiftCardTransactions,
	useQueryInternationalAirtimeTransactions,
	useQueryInternationalDataTransactions,
	useQueryESimTransactions,
	useQueryTransactions,
} from 'hooks';

type TDataStatistics = {
	service: string;
	data: { [key: string]: any }[] | null;
};

const Statistics = () => {
	usePageTitle('Statistics');

	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedFilter, setSelectedFilter] = useState<string>(
		STATISTIC_TAB.ALL_TIME
	);

	const filterUrlEntries = useRef<null | { [key: string]: any }>(null);

	const queryValues = useRef<null | { [key: string]: any }>(null);

	const maxRecordRef = useRef<number>(20);
	const skipValue = useRef<number>(0);

	const [dataStatistics, setDataStatistics] = useState<null | TDataStatistics>(
		null
	);

	const handleSetDataStatistics = (data: TDataStatistics) => {
		setDataStatistics(data);
	};

	const handleSetTotal = (metadata: Metadata) => {
		if (metadata?.total) {
			const total = metadata?.total;

			setTotal(total);
		}
	};

	const resetQueryValue = (service: string) => {
		if (service !== queryValues?.current?.service) {
			skipValue.current = 0;
			filterUrlEntries.current = null;
			setCurrentPage(1);
		}
	};

	const { isLoadingDataSubscriptions, queryDataSubscriptions } =
		useQueryDataSubscriptions((data, metadata) => {
			handleSetTotal(metadata as Metadata);

			setDataStatistics({
				service: SERVICES.DATA_SUBSCRIPTION,
				data,
			});
		});

	const { queryAirtimeTransactions, isLoadingAirtimeTransactions } =
		useQueryAirtimeTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.AIRTIME_TOP_UP,
				data,
			});
		});

	const { queryConvertAirtimes, isLoadingConvertAirtime } =
		useQueryConvertAirtimes((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.AIRTIME_CONVERSION,
				data,
			});
		});

	const { queryAutoConvertAirtimes, isLoadingAutoConvertAirtime } =
		useQueryAutoConvertAirtimes((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.AUTO_AIRTIME_CONVERSION,
				data,
			});
		});

	const { isLoadingBillTransactions, queryBillTransactions } =
		useQueryBillTransactions(({ data, service, metadata }) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service,
				data,
			});
		});

	const { isLoadingWalletWithdrawals, queryWalletWithdrawals } =
		useQueryWalletWithdrawals((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.WITHDRAWAL,
				data,
			});
		});

	const { isLoadingEPinTransactions, queryEPinTransactions } =
		useQueryEPinTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.EPIN,
				data,
			});
		});

	const { isLoadingWalletFundings, queryWalletFundings } =
		useQueryWalletFundings((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.CARD_FUNDING,
				data,
			});
		});

	const { isLoadingWalletTransfers, queryWalletTransfers } =
		useQueryWalletTransfers((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.WALLET_TRANSFER,
				data,
			});
		});

	const { isLoadingESimTransactions, queryESimTransactions } =
		useQueryESimTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.ESIM,
				data,
			});
		});

	const { isLoadingGiftCardTransactions, queryGiftCardTransactions } =
		useQueryGiftCardTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.GIFT_CARD,
				data,
			});
		});

	const { queryInterAirtimeTransactions, isLoadingInterAirtimeTransactions } =
		useQueryInternationalAirtimeTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.INTERNATIONAL_AIRTIME_TOP_UP,
				data,
			});
		});

	// useQueryInternationalDataTransactions

	const { queryInterDataTransactions, isLoadingInterDataTransactions } =
		useQueryInternationalDataTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				service: SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION,
				data,
			});
		});

	const { isLoadingTransactions, queryTransactions } = useQueryTransactions(
		({ data, metadata, service }) => {
			handleSetTotal(metadata as Metadata);
			setDataStatistics({
				data,
				service: service as string,
			});
		}
	);

	const isLoading =
		isLoadingDataSubscriptions ||
		isLoadingAirtimeTransactions ||
		isLoadingConvertAirtime ||
		isLoadingAutoConvertAirtime ||
		isLoadingBillTransactions ||
		isLoadingWalletWithdrawals ||
		isLoadingEPinTransactions ||
		isLoadingWalletFundings ||
		isLoadingWalletTransfers ||
		isLoadingESimTransactions ||
		isLoadingInterDataTransactions ||
		isLoadingInterAirtimeTransactions ||
		isLoadingGiftCardTransactions ||
		isLoadingTransactions;

	const switchHandleSubmit = async (values: Record<string, any>) => {
		let payload: { [key: string]: any } = {
			populate: 'user,plan,dataType,network',
			limit: maxRecordRef.current,
			sort: '-createdAt',
		};

		resetQueryValue(values.service);

		queryValues.current = values;

		if (skipValue.current > 0) payload.skip = skipValue.current;

		// console.log(filterUrlEntries.current);

		if (filterUrlEntries.current)
			payload = { ...payload, ...filterUrlEntries.current };

		if (values.service === SERVICES.DATA_SUBSCRIPTION) {
			if (values.plan) payload.plan = values.plan;
			if (values.type) payload.dataType = values.type;
			queryDataSubscriptions(payload);
			return;
		}

		if (values.service === SERVICES.AIRTIME_TOP_UP) {
			if (values.provider) payload.network = values.provider;
			queryAirtimeTransactions(payload);
			return;
		}

		if (values.service === SERVICES.AIRTIME_CONVERSION) {
			if (values.provider) payload.network = values.provider;
			queryConvertAirtimes(payload);
			return;
		}

		if (values.service === SERVICES.AUTO_AIRTIME_CONVERSION) {
			if (values.provider) payload.network = values.provider;
			queryAutoConvertAirtimes(payload);
			return;
		}

		if (values.service === SERVICES.WITHDRAWAL) {
			payload.populate = 'user';
			queryWalletWithdrawals(payload);
			return;
		}

		if (values.service === SERVICES.CARD_FUNDING) {
			payload.populate = 'user';
			queryWalletFundings(payload);
			return;
		}

		if (values.service === SERVICES.WALLET_TRANSFER) {
			payload.populate = 'userTo,userFrom,transactionFrom';
			queryWalletTransfers(payload);
			return;
		}

		if (values.service === SERVICES.EPIN) {
			payload.populate = 'user,pin_data.network';
			queryEPinTransactions(payload);
			return;
		}

		if (values.service === SERVICES.INTERNATIONAL_AIRTIME_TOP_UP) {
			payload.populate = 'user';
			queryInterAirtimeTransactions(payload);
			return;
		}

		if (values.service === SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION) {
			payload.populate = 'user';
			queryInterDataTransactions(payload);
			return;
		}

		if (values.service === SERVICES.ESIM) {
			queryESimTransactions(payload);
			return;
		}

		if (values.service === SERVICES.GIFT_CARD) {
			payload.populate = 'user';
			queryGiftCardTransactions(payload);
			return;
		}

		if (
			values.service === SERVICES.CREDIT ||
			values.service === SERVICES.DEBIT ||
			values.service === SERVICES.REFUND ||
			values.service === SERVICES.REVERSAL
		) {
			payload.service = values.service;
			payload.populate = 'user';
			queryTransactions(payload);
			return;
		}

		if (
			values.service === SERVICES.CABLE ||
			values.service === SERVICES.INTERNET ||
			values.service === SERVICES.ELECTRICITY ||
			values.service === SERVICES.EDUCATION ||
			values.service === SERVICES.BETTING
		) {
			payload.type = values.service;
			if (values.provider) payload.name = values.provider;

			await queryBillTransactions(payload);
			return;
		}
	};

	const handleChangeRowsPerPage = (value: number) => {
		maxRecordRef.current = value;

		switchHandleSubmit(queryValues?.current as any);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);

		skipValue.current = (page - 1) * maxRecordRef.current;

		switchHandleSubmit(queryValues?.current as any);
	};

	// Filters

	const handleSelectFilter = (filter: string) => {
		setSelectedFilter(filter);
		let filterBy = '';
		if (filter === STATISTIC_TAB.LAST_7_DAY) {
			filterBy = getFilterDateRange(7);
		}

		if (filter === STATISTIC_TAB.LAST_30_DAYS) {
			filterBy = getFilterDateRange(30);
		}

		if (filter === STATISTIC_TAB.TODAY) {
			filterBy = getFilterDateRange(1);
		}

		if (filter === STATISTIC_TAB.ALL_TIME) {
			filterBy = '';
			filterUrlEntries.current = null;
		}

		if (filterBy) {
			const searchParams = new URLSearchParams(filterBy);
			filterUrlEntries.current = Object.fromEntries(searchParams);
		}

		if (queryValues?.current) switchHandleSubmit(queryValues?.current as any);
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
						<SearchStatistics
							switchHandleSubmit={switchHandleSubmit}
							setDataStatistics={handleSetDataStatistics}
							isLoading={
								isLoading &&
								!filterUrlEntries.current &&
								!(skipValue.current > 0)
							}
						/>

						<StatisticTab
							selectedFilter={selectedFilter}
							selectFilter={handleSelectFilter}
						/>
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
									isLoading={isLoadingDataSubscriptions}
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
							{dataStatistics.service === SERVICES.CABLE && (
								<CableTransactionsTable
									isLoading={isLoadingBillTransactions}
									data={dataStatistics.data as any}
								/>
							)}
							{dataStatistics.service === SERVICES.INTERNET && (
								<InternetTransactionsTable
									isLoading={isLoadingBillTransactions}
									data={dataStatistics.data as any}
								/>
							)}

							{(dataStatistics?.service ===
								SERVICES.INTERNATIONAL_AIRTIME_TOP_UP ||
								dataStatistics?.service ===
									SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION) && (
								<RTransactionTable
									isLoading={isLoadingBillTransactions}
									data={dataStatistics?.data as Transaction[]}
								/>
							)}
							{(dataStatistics?.service === SERVICES.ESIM ||
								dataStatistics?.service === SERVICES.GIFT_CARD) && (
								<GiftcardESimTransactionTable
									isLoading={isLoadingBillTransactions}
									data={dataStatistics?.data as Transaction[]}
								/>
							)}

							{dataStatistics.service === SERVICES.EDUCATION && (
								<EducationTransactionsTable
									data={dataStatistics.data as Transaction[]}
									isLoading={isLoading}
								/>
							)}
							{dataStatistics.service === SERVICES.ELECTRICITY && (
								<ElectricityTransactionsTable
									data={dataStatistics.data as Transaction[]}
									isLoading={isLoadingBillTransactions}
								/>
							)}
							{dataStatistics.service === SERVICES.WITHDRAWAL && (
								<WithdrawalTransactionsTable
									data={dataStatistics.data as IWithdrawal[]}
									isLoading={isLoading}
								/>
							)}
							{dataStatistics.service === SERVICES.AUTO_AIRTIME_CONVERSION && (
								<AutoAirtimeConversionTransactionsTable
									data={dataStatistics.data as any}
								/>
							)}
							{dataStatistics.service === SERVICES.CARD_FUNDING && (
								<CardTopUpTransactionsTable
									data={dataStatistics.data as Transaction[]}
									isLoading={isLoading}
								/>
							)}
							{dataStatistics.service === SERVICES.BETTING && (
								<BettingTransactionsTable
									data={dataStatistics.data as IPurchasedBill[]}
									isLoading={isLoading}
								/>
							)}

							{dataStatistics.service === SERVICES.REVERSAL && (
								<ReversalTransactionsTable data={dataStatistics.data as any} />
							)}
							{dataStatistics.service === SERVICES.EPIN && (
								<EPinTransactionsTable
									data={dataStatistics.data as Transaction[]}
									isLoading={isLoading}
								/>
							)}
							{dataStatistics.service === SERVICES.WALLET_TRANSFER && (
								<WalletTransferTransactionsTable
									data={dataStatistics.data as Transaction[]}
									isLoading={isLoading}
								/>
							)}

							{[
								SERVICES.CREDIT,
								SERVICES.DEBIT,
								SERVICES.REFUND,
								SERVICES.REVERSAL,
							].includes(`${dataStatistics?.service}`) && (
								<CreditDebitTable
									data={dataStatistics?.data as Transaction[]}
									isLoading={isLoading}
								/>
							)}
						</>
					)}

					{!isLoading && total > maxRecordRef.current && (
						<Box>
							<TablePagination
								page={currentPage - 1}
								count={Number(total)}
								onPageChange={(value) => handlePageChange(value + 1)}
								rowsPerPage={maxRecordRef.current}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</Box>
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
