import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData } from '../utilities';

const Manager = {
	CreateManager: async ({
		token,
		data,
	}: {
		token: string;
		data: ManagerDetailsData;
	}) =>
		apiRequest({
			method: 'POST',
			url: ENDPOINTS.Manager,
			token,
			data,
		}),
	UpdateManager: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: ManagerDetailsData;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${ENDPOINTS.Manager}/${id}`,
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
			url: `${ENDPOINTS.Manager}`,
			token,
			params,
		}),
};

export default Manager;
