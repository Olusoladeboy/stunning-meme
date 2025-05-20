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

export const updateESimTransactions = async (payload: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<any>> =>
	apiRequest({
		url: `${ENDPOINTS.ESim}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});
