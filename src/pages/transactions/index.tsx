import React, { useState, useRef, MouseEvent, CSSProperties } from 'react';
import {
	Box,
	Button,
	ClickAwayListener,
	List,
	ListItemButton,
	Popper,
	styled,
	useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { ArrowDropDown } from '@mui/icons-material';
import {
	DataSubscriptionTable,
	Layout,
	AirtimePurchaseTable,
	ConversionsTable,
	CableTransactionsTable,
	InternetTransactionsTable,
	EducationTransactionsTable,
	ElectricityTransactionsTable,
	WalletTransferTransactionsTable,
	WithdrawalTransactionsTable,
	CardTopUpTransactionsTable,
	BettingTransactionsTable,
	EPinTransactionsTable,
	TablePagination,
	TableHeader,
	TransactionMainBalance,
	TransactionsTab,
	AutoConversionsTable,
	CreditDebitTable,
	RTransactionTable,
	GiftcardESimTransactionTable,
} from 'components';
import {
	BOX_SHADOW,
	SERVICES,
	Metadata,
	IPurchasedBill,
	IWithdrawal,
	capitalize,
	IGroupAutoTransaction,
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
	useQueryTransactions,
	useAlert,
	useQueryGiftCardTransactions,
	useQueryInternationalAirtimeTransactions,
	useQueryInternationalDataTransactions,
	useQueryESimTransactions,
} from 'hooks';
import { useAppSelector } from 'store/hooks';

type TDataStatistics = {
	service: string;
	data: { [key: string]: any }[] | null;
};

const Transactions = () => {
	usePageTitle('Transactions');

	const alert = useAlert();
	const theme = useTheme();
	const styles = useStyles(theme);

	const canViewStatistics = useAppSelector(
		(store) => store.authState?.canViewStatistics
	);

	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedService, setSelectedService] = useState<string>('');

	const filterUrlEntries = useRef<null | { [key: string]: any }>(null);
	const [serviceAnchorEl, setServiceAnchorEl] = useState<null | HTMLElement>(
		null
	);

	const queryValues = useRef<null | { [key: string]: any }>(null);

	const maxRecordRef = useRef<number>(20);
	const skipValue = useRef<number>(0);

	const [dataTransactions, setDataTransaction] =
		useState<null | TDataStatistics>(null);

	const handleServiceClick = (e: MouseEvent<HTMLElement>) => {
		setServiceAnchorEl(serviceAnchorEl ? null : e.currentTarget);
	};

	const handleSetTotal = (metadata: Metadata) => {
		const total = parseInt(`${metadata?.total}`);
		setTotal(total);
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

			setDataTransaction({
				service: SERVICES.DATA_SUBSCRIPTION,
				data,
			});
		});

	const { queryAirtimeTransactions, isLoadingAirtimeTransactions } =
		useQueryAirtimeTransactions((data, metadata) => {
			console.log('META_DATA::', metadata);
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.AIRTIME_TOP_UP,
				data,
			});
		});

	const { queryConvertAirtimes, isLoadingConvertAirtime } =
		useQueryConvertAirtimes((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.AIRTIME_CONVERSION,
				data,
			});
		});

	const { queryAutoConvertAirtimes, isLoadingAutoConvertAirtime } =
		useQueryAutoConvertAirtimes((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.AUTO_AIRTIME_CONVERSION,
				data,
			});
		});

	const { isLoadingBillTransactions, queryBillTransactions } =
		useQueryBillTransactions(({ data, service, metadata }) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service,
				data,
			});
		});

	const { isLoadingWalletWithdrawals, queryWalletWithdrawals } =
		useQueryWalletWithdrawals((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.WITHDRAWAL,
				data,
			});
		});

	const { isLoadingEPinTransactions, queryEPinTransactions } =
		useQueryEPinTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.EPIN,
				data,
			});
		});

	const { isLoadingWalletFundings, queryWalletFundings } =
		useQueryWalletFundings((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.CARD_FUNDING,
				data,
			});
		});

	const { isLoadingWalletTransfers, queryWalletTransfers } =
		useQueryWalletTransfers((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.WALLET_TRANSFER,
				data,
			});
		});

	const { isLoadingTransactions, queryTransactions } = useQueryTransactions(
		({ data, metadata, service }) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				data,
				service: service as string,
			});
		}
	);

	const { isLoadingESimTransactions, queryESimTransactions } =
		useQueryESimTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.ESIM,
				data,
			});
		});

	const { isLoadingGiftCardTransactions, queryGiftCardTransactions } =
		useQueryGiftCardTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.GIFT_CARD,
				data,
			});
		});

	const { queryInterAirtimeTransactions, isLoadingInterAirtimeTransactions } =
		useQueryInternationalAirtimeTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.INTERNATIONAL_AIRTIME_TOP_UP,
				data,
			});
		});

	// useQueryInternationalDataTransactions

	const { queryInterDataTransactions, isLoadingInterDataTransactions } =
		useQueryInternationalDataTransactions((data, metadata) => {
			handleSetTotal(metadata as Metadata);
			setDataTransaction({
				service: SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION,
				data,
			});
		});

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
		isLoadingTransactions ||
		isLoadingESimTransactions ||
		isLoadingGiftCardTransactions ||
		isLoadingInterDataTransactions ||
		isLoadingInterAirtimeTransactions;

	const switchHandleSubmit = async (values: Record<string, any>) => {
		let payload: { [key: string]: any } = {
			// populate: 'user,plan,dataType,network',
			limit: maxRecordRef.current,
			sort: '-createdAt',
		};

		resetQueryValue(values.service);

		queryValues.current = values;

		if (skipValue.current > 0) payload.skip = skipValue.current;
		if (values.reference) payload.reference = values.reference;

		// console.log(filterUrlEntries.current);

		if (filterUrlEntries.current)
			payload = { ...payload, ...filterUrlEntries.current };

		if (values.service === SERVICES.DATA_SUBSCRIPTION) {
			payload.populate = 'user,plan,plan.network,dataType,network';
			if (values.plan) payload.plan = values.plan;
			if (values.type) payload.dataType = values.type;
			queryDataSubscriptions(payload);
			return;
		}

		if (values.service === SERVICES.AIRTIME_TOP_UP) {
			if (values.provider) payload.network = values.provider;
			payload.populate = 'user,plan.network,network';
			queryAirtimeTransactions(payload);
			return;
		}

		if (values.service === SERVICES.AIRTIME_CONVERSION) {
			if (values.provider) payload.network = values.provider;
			payload.populate = 'user,plan,plan.network,network';
			queryConvertAirtimes(payload);
			return;
		}

		if (values.service === SERVICES.AUTO_AIRTIME_CONVERSION) {
			if (values.provider) payload.network = values.provider;
			payload.populate = 'user,network';

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

		// queryInterDataTransactions

		if (values.service === SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION) {
			payload.populate = 'user';
			queryInterDataTransactions(payload);
			return;
		}

		if (values.service === SERVICES.ESIM) {
			payload.populate = 'user';
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
			payload.populate = 'user';
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

	const handleSelectFilter = (service: string) => {
		setServiceAnchorEl(null);
		setSelectedService(service);

		switchHandleSubmit({
			service,
		});
	};

	const handleSearch = (reference: string) => {
		if (!selectedService) {
			alert({
				message: 'Select a service type',
				type: 'info',
			});
			return;
		}

		if (!reference) {
			alert({
				message: 'Enter transaction reference',
				type: 'info',
			});
			return;
		}

		const payload = {
			service: selectedService,
			reference,
		};

		switchHandleSubmit(payload);
	};

	const clearSearch = () => {
		switchHandleSubmit({
			service: selectedService,
		});
	};

	const statusFilter = (
		<ClickAwayListener onClickAway={() => setServiceAnchorEl(null)}>
			<Box>
				<Button
					size='large'
					style={styles.button as CSSProperties}
					onClick={(e) => handleServiceClick(e)}
					variant={'outlined'}
					endIcon={<ArrowDropDown />}
				>
					{selectedService ? (
						<>
							{selectedService === SERVICES.CARD_FUNDING
								? 'Card/Bank funding'
								: `${capitalize(selectedService)}`}
						</>
					) : (
						'Filter by Service'
					)}
				</Button>
				<Popper
					// sx={{ zIndex: theme.zIndex.tooltip }}
					open={Boolean(serviceAnchorEl)}
					anchorEl={serviceAnchorEl}
					sx={{
						zIndex: theme.zIndex.appBar - 10,
					}}
				>
					<List
						sx={{
							'& .MuiListItemButton-root': {
								textTransform: 'capitalize',
							},
							'& .MuiListItemButton-root:hover': {
								backgroundColor: theme.palette.primary.main,
								color: grey[50],
							},
							maxHeight: '360px',
							height: '100%',
							overflow: 'auto',
						}}
						style={styles.list}
					>
						{Object.values(SERVICES).map((value) => (
							<ListItemButton
								onClick={() => handleSelectFilter(value)}
								key={value}
							>
								{value === SERVICES.CARD_FUNDING
									? 'Card/Bank Funding'
									: capitalize(value.replace(/_/g, ' '))}
							</ListItemButton>
						))}
					</List>
				</Popper>
			</Box>
		</ClickAwayListener>
	);

	return (
		<Layout>
			<Container>
				<Box
					sx={{
						padding: { xs: '0px 15px', md: '0px 2rem' },
						display: 'grid',
						gap: '2rem',
					}}
				>
					<TableHeader
						searchPlaceholder={'Search transaction by reference'}
						title={'Transactions'}
						statusFilter={statusFilter}
						handleSearch={handleSearch}
						clearSearch={clearSearch}
					/>
					{canViewStatistics && <TransactionMainBalance />}
					<TransactionsTab />
				</Box>
				<Box
					sx={{
						overflow: 'auto',
					}}
				>
					{dataTransactions?.service === SERVICES.DATA_SUBSCRIPTION && (
						<DataSubscriptionTable
							isLoading={isLoadingDataSubscriptions}
							subscriptions={dataTransactions?.data as any}
						/>
					)}
					{dataTransactions?.service === SERVICES.AIRTIME_TOP_UP && (
						<AirtimePurchaseTable
							transactions={dataTransactions?.data as any}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.AIRTIME_CONVERSION && (
						<ConversionsTable
							conversions={dataTransactions?.data as any}
							isLoading={isLoading}
							isDisplayTransactionDetails
							handleRefetch={() =>
								switchHandleSubmit(queryValues?.current as any)
							}
						/>
					)}
					{(dataTransactions?.service ===
						SERVICES.INTERNATIONAL_AIRTIME_TOP_UP ||
						dataTransactions?.service ===
							SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION) && (
						<RTransactionTable
							isLoading={isLoadingTransactions}
							data={dataTransactions?.data as Transaction[]}
						/>
					)}
					{(dataTransactions?.service === SERVICES.ESIM ||
						dataTransactions?.service === SERVICES.GIFT_CARD) && (
						<GiftcardESimTransactionTable
							isLoading={isLoadingTransactions}
							data={dataTransactions?.data as Transaction[]}
						/>
					)}
					{dataTransactions?.service === SERVICES.CABLE && (
						<CableTransactionsTable
							isLoading={isLoadingBillTransactions}
							data={dataTransactions?.data as Transaction[]}
						/>
					)}
					{dataTransactions?.service === SERVICES.INTERNET && (
						<InternetTransactionsTable
							isLoading={isLoadingBillTransactions}
							data={dataTransactions?.data as any}
						/>
					)}
					{dataTransactions?.service === SERVICES.EDUCATION && (
						<EducationTransactionsTable
							data={dataTransactions?.data as Transaction[]}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.ELECTRICITY && (
						<ElectricityTransactionsTable
							data={dataTransactions?.data as Transaction[]}
							isLoading={isLoadingBillTransactions}
						/>
					)}
					{dataTransactions?.service === SERVICES.WITHDRAWAL && (
						<WithdrawalTransactionsTable
							data={dataTransactions?.data as IWithdrawal[]}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.AUTO_AIRTIME_CONVERSION && (
						<AutoConversionsTable
							conversions={dataTransactions?.data as IGroupAutoTransaction[]}
							isLoading={isLoading}
							isDisplayPopupTransactionDetails
						/>
					)}
					{dataTransactions?.service === SERVICES.CARD_FUNDING && (
						<CardTopUpTransactionsTable
							data={dataTransactions?.data as Transaction[]}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.BETTING && (
						<BettingTransactionsTable
							data={dataTransactions?.data as IPurchasedBill[]}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.EPIN && (
						<EPinTransactionsTable
							data={dataTransactions?.data as Transaction[]}
							isLoading={isLoading}
						/>
					)}
					{dataTransactions?.service === SERVICES.WALLET_TRANSFER && (
						<WalletTransferTransactionsTable
							data={dataTransactions?.data as Transaction[]}
							isLoading={isLoading}
						/>
					)}
				</Box>

				{[
					SERVICES.CREDIT,
					SERVICES.DEBIT,
					SERVICES.REFUND,
					SERVICES.REVERSAL,
				].includes(`${dataTransactions?.service}`) && (
					<CreditDebitTable
						data={dataTransactions?.data as Transaction[]}
						isLoading={isLoading}
					/>
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
		</Layout>
	);
};

export default Transactions;

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

const useStyles = (theme: any) => ({
	container: {
		display: 'grid',
		gridTemplateColumn: '1fr',
		gap: theme.spacing(4),
		border: `0.5px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 0px',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
	},
	paginationWrapper: {
		display: 'flex',
		justifyContent: 'flex-end',
		paddingRight: '20px',
	},
	button: {
		whiteSpace: 'nowrap',
		minWidth: '160px',
	},
	list: {
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: theme.spacing(1),
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(2),
	},
});
