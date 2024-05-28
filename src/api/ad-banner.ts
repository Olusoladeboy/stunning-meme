import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, IAdBanner } from '../utilities';

export const adBanners = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IAdBanner[]>> =>
	apiRequest({
		url: ENDPOINTS.Adverts,
		method: 'GET',
		params,
	});

export const createBanner = async (data?: {
	[key: string]: any;
}): Promise<DataResponse<IAdBanner[]>> =>
	apiRequest({
		url: ENDPOINTS.Adverts,
		method: 'POST',
		data,
	});
