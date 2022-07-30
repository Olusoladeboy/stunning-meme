import apiRequest from './apiRequest';
import { API_ENDPOINTS, ManagerDetailsDataTypes } from '../types';

const Manager = {
	CreateManager: async ({
		token,
		data,
	}: {
		token: string;
		data: ManagerDetailsDataTypes;
	}) =>
		apiRequest({
			method: 'POST',
			url: API_ENDPOINTS.Manager,
			token,
			data,
		}),
	UpdateManager: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: ManagerDetailsDataTypes;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.Manager}/${id}`,
			token,
			data,
		}),
	AllManagers: async ({
		token,
		params,
	}: {
		token: string;
		params: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: `${API_ENDPOINTS.Manager}`,
			token,
			params,
		}),
};

export default Manager;
