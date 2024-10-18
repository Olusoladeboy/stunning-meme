import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';

export const eSimTransactions = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.ESim,
		method: 'GET',
		params,
	});
