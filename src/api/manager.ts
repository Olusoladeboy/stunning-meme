import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData } from '../utilities';

export const createManager = async (data: ManagerDetailsData): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Manager,

		data,
	});

export const uploadManagerProfile = async ({
	data,
	manager,
}: {
	data: { [key: string]: any };
	manager: string;
}): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Manager}/upload-display-picture/${manager}`,
		data,
	});

export const updateManager = async ({
	data,
	id,
}: {
	data: ManagerDetailsData;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Manager}/${id}`,

		data,
	});
export const deleteManager = async (id: string): Promise<any> =>
	apiRequest({
		method: 'DELETE',
		url: `${ENDPOINTS.Manager}/${id}`,
	});

export const managers = async ({
	params,
}: {
	params: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Manager}`,

		params,
	});
