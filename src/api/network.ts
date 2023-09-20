import apiRequest from './apiRequest';
import { DataResponse, NetworkData } from '../utilities';

export const networks = async ({
	url,
	params,
}: {
	url: string;
	sort?: string;
	params?: { [key: string]: any };
}): Promise<DataResponse<NetworkData[]>> =>
	apiRequest({
		method: 'GET',
		url,
		params,
	});

export const createNetwork = async ({
	url,
	data,
}: {
	url: string;
	data: NetworkData;
}): Promise<DataResponse<NetworkData>> =>
	apiRequest({
		method: 'POST',
		url,

		data,
	});

export const updateNetwork = async ({
	url,
	data,
	id,
}: {
	url: string;
	data: NetworkData;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${url}/${id}`,

		data,
	});
