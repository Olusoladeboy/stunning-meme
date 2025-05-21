import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, IRecipient } from '../utilities';

export const getRecipients = async (params: {
	[key: string]: any;
}): Promise<DataResponse<IRecipient[]>> =>
	apiRequest({
		url: ENDPOINTS.Recipients,
		method: 'GET',
		params,
	});

export const createRecipient = async (
	data: Partial<IRecipient>
): Promise<DataResponse<IRecipient>> =>
	apiRequest({
		url: ENDPOINTS.Recipients,
		method: 'POST',
		data,
	});

export const updateRecipient = async (payload: {
	data: Partial<IRecipient>;
	id: string;
}): Promise<DataResponse<IRecipient>> =>
	apiRequest({
		url: `${ENDPOINTS.Recipients}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});

export const deleteRecipient = async (id: string): Promise<DataResponse<any>> =>
	apiRequest({
		url: `${ENDPOINTS.Recipients}/${id}`,
		method: 'DELETE',
	});
