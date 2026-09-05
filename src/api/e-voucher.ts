import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';
import { GenericAbortSignal } from 'axios';

export const voucherTransactions = async (
	params: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.EVouchers,
		method: 'GET',
		params,
		signal,
	});
