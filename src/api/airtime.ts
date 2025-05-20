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

export const updateAirtime = async (payload: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<any>> =>
	apiRequest({
		url: `${ENDPOINTS.Airtime}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});

export const internationalAirtimeTransactions = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.InternationalAirtime,
		method: 'GET',
		params,
	});

export const updateInternationalAirtimeTransactions = async (payload: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: `${ENDPOINTS.InternationalAirtime}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});
