import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, User } from '../utilities';

export const createStaff = async (data: User): Promise<DataResponse<User>> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Staff,
		data,
	});

export const updateStaff = async ({
	data,
	id,
}: {
	data: User;
	id: string;
}): Promise<DataResponse<User>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Staff}/${id}`,
		data,
	});

export const staffs = async (params: {
	[key: string]: any;
}): Promise<DataResponse<User[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}`,
		params,
	});
