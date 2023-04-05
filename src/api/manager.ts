import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData } from '../utilities';

export const createManager = async (data: ManagerDetailsData): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Manager,

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
