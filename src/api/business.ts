import apiRequest from './apiRequest';
import { ENDPOINTS, IBusiness, DataResponse } from '../utilities';

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
}): Promise<DataResponse<IBusiness[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Commissions}`,
		params,
	});

export const createBusinessCommissions = async (data?: {
	[key: string]: any;
}): Promise<DataResponse<IBusiness[]>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Commissions}`,
		data,
	});
