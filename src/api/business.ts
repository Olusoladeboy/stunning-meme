import apiRequest from './apiRequest';
import { ENDPOINTS, IBusiness, DataResponse, ICommission } from '../utilities';

export const businesses = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IBusiness[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Business}`,
		params,
	});

export const businessCommissions = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<ICommission[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Commissions}`,
		params,
	});

export const createBusinessCommissions = async (data?: {
	[key: string]: any;
}): Promise<DataResponse<ICommission>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Commissions}`,
		data,
	});

export const deleteBusinessCommissions = async (
	id: string
): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'DELETE',
		url: `${ENDPOINTS.Commissions}/${id}`,
	});

export const updateBusinessCommissions = async ({
	id,
	data,
}: {
	id: string;
	data: {
		commissionRate: number;
	};
}): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Commissions}/${id}`,
		data,
	});
