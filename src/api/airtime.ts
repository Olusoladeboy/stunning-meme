import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';

export const airtimeTransactions = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.Airtime,
		method: 'GET',
		params,
	});
