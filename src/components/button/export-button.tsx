import React, { useRef, useState } from 'react';
import Button from '.';
import { Box } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import {
	SECOUNDARY_COLOR,
	SERVICES,
	dateRanges,
	extractUserName,
	generateRandomNumber,
} from 'utilities';
import DatePicker from 'components/form-components/date-picker';
import ModalWrapper from '../modal/Wrapper';
import {
	useQueryAirtimeTransactions,
	useQueryAutoConvertAirtimes,
	useQueryBillTransactions,
	useQueryConvertAirtimes,
	useQueryDataSubscriptions,
	useQueryEPinTransactions,
	useQueryESimTransactions,
	useQueryGiftCardTransactions,
	useQueryInternationalAirtimeTransactions,
	useQueryInternationalDataTransactions,
	useQueryTransactions,
	useQueryWalletFundings,
	useQueryWalletTransfers,
	useQueryWalletWithdrawals,
} from 'hooks';

interface IExportButton {
	onExport?: (dateRange: string) => void;
	isProcessing?: boolean;
	service: string;
}

type TTransactionPayload = {
	service: string;
	data: { [key: string]: any }[] | null;
};

const handleProcessData = (data: any) => {
	return data.map((value: { [key: string]: any }) => {
		// console.log(value);
		if (value.user && Object.keys(value.user).length > 0) {
			value.user = extractUserName(value.user);
		}

		if (value.network && Object.keys(value.network).length > 0)
			value.network = value.network.name;

		if (value.plan && Object.keys(value.plan).length > 0)
			value.plan = value.plan.name;

		if (value.dataType && Object.keys(value.dataType).length > 0)
			value.dataType = value.dataType.name;

		return value;
	});
};

const ExportButton = ({ onExport, isProcessing, service }: IExportButton) => {
	const [isDisplayPicker, setDisplayPicker] = useState<boolean>(false);

	const queryValues = useRef<null | { [key: string]: any }>(null);

	const skipValue = useRef<number>(0);
	const csvLink = useRef<any>(null);

	const [transactionPayload, setTransactionPayload] =
		useState<null | TTransactionPayload>(null);

	const { isLoadingDataSubscriptions, queryDataSubscriptions } =
		useQueryDataSubscriptions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);

			setTransactionPayload({
				service: SERVICES.DATA_SUBSCRIPTION,
				data: handleProcessData(data),
			});
		});

	const { queryAirtimeTransactions, isLoadingAirtimeTransactions } =
		useQueryAirtimeTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.AIRTIME_TOP_UP,
				data: handleProcessData(data),
			});
		});

	const { queryConvertAirtimes, isLoadingConvertAirtime } =
		useQueryConvertAirtimes((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.AIRTIME_CONVERSION,
				data: handleProcessData(data),
			});
		});

	const { queryAutoConvertAirtimes, isLoadingAutoConvertAirtime } =
		useQueryAutoConvertAirtimes((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.AUTO_AIRTIME_CONVERSION,
				data: handleProcessData(data),
			});
		});

	const { isLoadingBillTransactions, queryBillTransactions } =
		useQueryBillTransactions(({ data, service, metadata }) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service,
				data: handleProcessData(data),
			});
		});

	const { isLoadingWalletWithdrawals, queryWalletWithdrawals } =
		useQueryWalletWithdrawals((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.WITHDRAWAL,
				data: handleProcessData(data),
			});
		});

	const { isLoadingEPinTransactions, queryEPinTransactions } =
		useQueryEPinTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.EPIN,
				data: handleProcessData(data),
			});
		});

	const { isLoadingWalletFundings, queryWalletFundings } =
		useQueryWalletFundings((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.CARD_FUNDING,
				data: handleProcessData(data),
			});
		});

	const { isLoadingWalletTransfers, queryWalletTransfers } =
		useQueryWalletTransfers((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.WALLET_TRANSFER,
				data: handleProcessData(data),
			});
		});

	const { isLoadingESimTransactions, queryESimTransactions } =
		useQueryESimTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.ESIM,
				data: handleProcessData(data),
			});
		});

	const { isLoadingGiftCardTransactions, queryGiftCardTransactions } =
		useQueryGiftCardTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.GIFT_CARD,
				data: handleProcessData(data),
			});
		});

	const { queryInterAirtimeTransactions, isLoadingInterAirtimeTransactions } =
		useQueryInternationalAirtimeTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.INTERNATIONAL_AIRTIME_TOP_UP,
				data: handleProcessData(data),
			});
		});

	// useQueryInternationalDataTransactions

	const { queryInterDataTransactions, isLoadingInterDataTransactions } =
		useQueryInternationalDataTransactions((data, metadata) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				service: SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION,
				data: handleProcessData(data),
			});
		});

	const { isLoadingTransactions, queryTransactions } = useQueryTransactions(
		({ data, metadata, service }) => {
			// handleSetTotal(metadata as Metadata);
			setTransactionPayload({
				data: handleProcessData(data),
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

	const switchHandleSubmit = async (
		values: Record<string, any>,
		callback?: (value: boolean) => void
	) => {
		let payload: { [key: string]: any } = {
			// sort: sortValue.current,
		};

		queryValues.current = values;

		// Date Range
		if (values.dateRange && Object.keys(values.dateRange).length > 0)
			payload = {
				...payload,
				...values.dateRange,
			};

		if (skipValue.current > 0) payload.skip = skipValue.current;

		if (service === SERVICES.DATA_SUBSCRIPTION) {
			payload.populate = 'user,network,plan,dataType';
			if (values.plan) payload.plan = values.plan;
			if (values.type) payload.dataType = values.type;
			await queryDataSubscriptions(payload);
			typeof callback === 'function' && callback(true);
			return;
		}

		if (service === SERVICES.AIRTIME_TOP_UP) {
			payload.populate = 'user,network';
			if (values.provider) payload.network = values.provider;
			await queryAirtimeTransactions(payload);
			return;
		}

		if (service === SERVICES.AIRTIME_CONVERSION) {
			payload.populate = 'user,network';
			if (values.provider) payload.network = values.provider;
			await queryConvertAirtimes(payload);
			return;
		}

		if (service === SERVICES.AUTO_AIRTIME_CONVERSION) {
			payload.populate = 'user,network';
			if (values.provider) payload.network = values.provider;
			await queryAutoConvertAirtimes(payload);
			return;
		}

		if (service === SERVICES.WITHDRAWAL) {
			payload.populate = 'user';
			await queryWalletWithdrawals(payload);
			return;
		}

		if (service === SERVICES.CARD_FUNDING) {
			payload.populate = 'user';
			await queryWalletFundings(payload);
			return;
		}

		if (service === SERVICES.WALLET_TRANSFER) {
			payload.populate = 'userTo,userFrom,transactionFrom';
			await queryWalletTransfers(payload);
			return;
		}

		if (service === SERVICES.EPIN) {
			payload.populate = 'user,pin_data.network';
			await queryEPinTransactions(payload);
			return;
		}

		if (service === SERVICES.INTERNATIONAL_AIRTIME_TOP_UP) {
			payload.populate = 'user';
			await queryInterAirtimeTransactions(payload);
			return;
		}

		if (service === SERVICES.INTERNATIONAL_DATA_SUBSCRIPTION) {
			payload.populate = 'user';
			await queryInterDataTransactions(payload);
			return;
		}

		if (service === SERVICES.ESIM) {
			await queryESimTransactions(payload);
			return;
		}

		if (service === SERVICES.GIFT_CARD) {
			payload.populate = 'user';
			await queryGiftCardTransactions(payload);
			return;
		}

		if (
			service === SERVICES.CREDIT ||
			service === SERVICES.DEBIT ||
			service === SERVICES.REFUND ||
			service === SERVICES.REVERSAL
		) {
			payload.service = service;
			payload.populate = 'user';
			await queryTransactions(payload);
			return;
		}

		if (
			service === SERVICES.CABLE ||
			service === SERVICES.INTERNET ||
			service === SERVICES.ELECTRICITY ||
			service === SERVICES.EDUCATION ||
			service === SERVICES.BETTING
		) {
			payload.type = service;
			if (values.provider) payload.name = values.provider;

			await queryBillTransactions(payload);
			return;
		}
	};

	const closeModal = () => {
		setDisplayPicker(false);
		setTransactionPayload(null);
	};

	const handleApplyChange = async (
		range: any,
		callback?: (value: boolean) => void
	) => {
		const { startDate, endDate } = range;
		const date = dateRanges(startDate, endDate);
		const dateFilter = new URLSearchParams(date);
		const values = {
			...queryValues?.current,
			dateRange: Object.fromEntries(dateFilter),
		};
		switchHandleSubmit(values, callback);

		// setDisplayPicker(false);
	};

	const handleSetDateRange = (date: string) => {
		setTransactionPayload((prev) => ({
			service: prev?.service as string,
			data: null,
		})); // Clear transaction data
	};

	return (
		<>
			<Box
				sx={{
					position: 'relative',
				}}
			>
				{isDisplayPicker && (
					<ModalWrapper
						title={'Specify Date Range'}
						contentWidth='700px'
						closeModal={closeModal}
					>
						<DatePicker
							isLoading={isLoading}
							buttonText={'Process Data'}
							onApplyChange={handleApplyChange}
							cancelPicker={() => setDisplayPicker(false)}
							setDateRange={handleSetDateRange}
							button={
								transactionPayload &&
								transactionPayload.data && (
									<Box>
										<CSVLink
											filename={`${service.toLowerCase()}-${generateRandomNumber(
												{
													length: 16,
													suggestion: '0123456789',
												}
											)}`}
											ref={csvLink}
											data={transactionPayload?.data || []}
										>
											Export Data
										</CSVLink>
									</Box>
								)
							}
						/>
					</ModalWrapper>
				)}
				<Button
					onClick={() => setDisplayPicker(true)}
					endIcon={<FileUpload />}
					sx={{
						backgroundColor: `${SECOUNDARY_COLOR} !important`,
						color: 'white',
						minWidth: '140px',
					}}
				>
					Export
				</Button>
			</Box>
		</>
	);
};

export default ExportButton;
