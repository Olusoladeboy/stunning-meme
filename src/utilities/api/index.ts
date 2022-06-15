import apiRequest from './apiRequest';
import {
	API_ENDPOINTS,
	LoginDataTypes,
	ManagerDetailsDataTypes,
} from '../types';

const Api = {
	Account: {
		Login: async (data: LoginDataTypes) =>
			apiRequest({
				method: 'POST',
				url: API_ENDPOINTS.Login,
				data,
			}),
		GetUser: async (token: string) =>
			apiRequest({
				method: 'GET',
				url: API_ENDPOINTS.GetUser,
				token,
			}),
	},
	Manager: {
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
		AllManagers: async (token: string) =>
			apiRequest({
				method: 'GET',
				url: API_ENDPOINTS.Manager,
				token,
			}),
	},
	User: {
		CreateUser: async ({
			token,
			data,
		}: {
			token: string;
			data: ManagerDetailsDataTypes;
		}) =>
			apiRequest({
				method: 'POST',
				url: API_ENDPOINTS.User,
				token,
				data,
			}),
		UpdateUser: async ({
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
				url: `${API_ENDPOINTS.User}/${id}`,
				token,
				data,
			}),
		AllUsers: async ({
			token,
			sort = '-createdAt',
		}: {
			token: string;
			sort?: string;
		}) =>
			apiRequest({
				method: 'GET',
				url: `${API_ENDPOINTS.User}?sort=${sort}`,
				token,
			}),
		GetUserById: async ({ token, id }: { token: string; id: string }) =>
			apiRequest({
				method: 'GET',
				url: `${API_ENDPOINTS.User}?_id=${id}`,
				token,
			}),
	},
};

export default Api;
