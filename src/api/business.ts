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
