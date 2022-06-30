import apiRequest from './apiRequest';
import {
	API_ENDPOINTS,
	LoginDataTypes,
	ManagerDetailsDataTypes,
	NetworkDataTypes,
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
	Network: {
		GetNetwork: async ({
			token,
			url,
			sort = '-createdAt',
		}: {
			token: string;
			url: string;
			sort?: string;
		}) =>
			apiRequest({
				method: 'GET',
				url: `${url}?sort=${sort}`,
				token,
			}),
		CreateNetwork: async ({
			token,
			url,
			data,
		}: {
			token: string;
			url: string;
			data: NetworkDataTypes;
		}) =>
			apiRequest({
				method: 'POST',
				url,
				token,
				data,
			}),
		UpdateNetwork: async ({
			token,
			url,
			data,
			id,
		}: {
			token: string;
			url: string;
			data: NetworkDataTypes;
			id: string;
		}) =>
			apiRequest({
				method: 'PUT',
				url: `${url}/${id}`,
				token,
				data,
			}),
	},
	KycLimits: {
		Retrieve: async (token: string) =>
			apiRequest({ url: API_ENDPOINTS.Kyc, method: 'GET', token }),
		Update: async ({
			token,
			data,
			id,
		}: {
			token: string;
			data: any;
			id: string;
		}) =>
			apiRequest({
				url: `${API_ENDPOINTS.Kyc}/${id}`,
				method: 'PUT',
				token,
				data,
			}),
	},
};

export default Api;
