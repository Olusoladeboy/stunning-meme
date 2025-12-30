import { DataResponse, ENDPOINTS, IEpin } from 'utilities';
import apiRequest from './apiRequest';

export const ePinTransactions = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IEpin[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.EPin}`,
		params,
	});

export const updateEPinTransaction = async (payload: {
	[key: string]: any;
	id: string;
}): Promise<DataResponse<IEpin[]>> =>
	apiRequest({
		url: `${ENDPOINTS.EPin}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});
