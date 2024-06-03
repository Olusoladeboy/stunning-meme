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

export const createBanner = async (data: {
	[key: string]: any;
}): Promise<DataResponse<IAdBanner[]>> =>
	apiRequest({
		url: ENDPOINTS.Adverts,
		method: 'POST',
		data,
	});

export const updateBanner = async (data: {
	id: string;
	payload: Partial<IAdBanner>;
}): Promise<DataResponse<IAdBanner>> =>
	apiRequest({
		url: `${ENDPOINTS.Adverts}/${data.id}`,
		method: 'PUT',
		data: data.payload,
	});

export const deleteBanner = async (
	id: string
): Promise<DataResponse<IAdBanner[]>> =>
	apiRequest({
		url: `${ENDPOINTS.Adverts}/${id}`,
		method: 'DELETE',
	});
