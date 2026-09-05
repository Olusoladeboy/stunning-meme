import apiRequest from './apiRequest';
import {
	DataResponse,
	ENDPOINTS,
	Transaction,
	IWithdrawal,
	IEpin,
	IFunding,
	ITransfer,
} from '../utilities';
import { GenericAbortSignal } from 'axios';

export const allTransactions = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}/all`,
		params,
	});

export const transactions = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}`,
		params,
		signal,
	});

export const transactionsStatistics = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.TransactionStatistics}`,
		params,
		signal,
	});

export const lienTransactions = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}/lien`,
		params,
		signal,
	});

export const transactUser = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<DataResponse<Transaction>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Transaction}/${id}`,
		data,
	});

export const walletWithdrawal = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<IWithdrawal[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Withdraw}`,
		params,
		signal,
	});

export const updateWalletWithdrawal = async ({
	data,
	id,
}: {
	data?: {
		[key: string]: any;
	};
	id: string;
}): Promise<DataResponse<IWithdrawal[]>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Withdraw}/status/${id}`,
		data,
	});

export const updateWalletWithdrawalRequest = async ({
	data,
	id,
}: {
	data?: {
		[key: string]: any;
	};
	id: string;
}): Promise<DataResponse<IWithdrawal[]>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Withdraw}/${id}`,
		data,
	});

export const walletFunding = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<IFunding[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Funding}`,
		params,
		signal,
	});

export const walletTransfers = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<ITransfer[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transfer}`,
		params,
		signal,
	});

export const bankFundings = async (
	params?: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transfer}`,
		params,
		signal,
	});

export const statementOfAccount = async (props: {
	signal?: AbortSignal;
	params?: {
		start_date: string;
		end_date: string;
	};
	userId: string;
}): Promise<DataResponse<undefined>> =>
	apiRequest({
		url: `${ENDPOINTS.Transaction}/user/${props.userId}/statement`,
		method: 'GET',
		signal: props.signal,
		params: props.params,
	});
