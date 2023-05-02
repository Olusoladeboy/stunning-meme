import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, Settings } from '../utilities';

export const settings = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Settings[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Settings}`,
		params,
	});

export const createSettings = async (
	data: Settings
): Promise<DataResponse<Settings>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Settings}`,
		data,
	});

export const updateSettings = async ({
	data,
	id,
}: {
	data: Settings;
	id: string;
}): Promise<DataResponse<Settings>> =>
	apiRequest({
		url: `${ENDPOINTS.Settings}/${id}`,
		method: 'PUT',
		data,
	});
