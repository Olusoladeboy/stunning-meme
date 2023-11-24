import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, User } from '../utilities';

export const createManager = async (data: User): Promise<DataResponse<User>> =>
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
	data: User;
	id: string;
}): Promise<DataResponse<User>> =>
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
