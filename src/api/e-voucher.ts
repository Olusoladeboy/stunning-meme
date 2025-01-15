import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';

export const voucherTransactions = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.EVouchers,
		method: 'GET',
		params,
	});
