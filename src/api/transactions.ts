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

export const transactions = async (params?: {
	[key: string]: any;
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}`,
		params,
	});

export const lienTransactions = async (params?: {
	[key: string]: any;
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}/lien`,
		params,
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

export const walletWithdrawal = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IWithdrawal[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Withdraw}`,
		params,
	});

export const walletFunding = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IFunding[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Funding}`,
		params,
	});

export const walletTransfers = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<ITransfer[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transfer}`,
		params,
	});

export const bankFundings = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transfer}`,
		params,
	});

export const ePinTransactions = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IEpin[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.EPin}`,
		params,
	});
