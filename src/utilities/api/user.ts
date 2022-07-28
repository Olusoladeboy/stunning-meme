import apiRequest from './apiRequest';
import { API_ENDPOINTS, ManagerDetailsDataTypes } from '../types';

const User = {
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
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: `${API_ENDPOINTS.User}`,
			token,
			params,
		}),
	GetUserById: async ({ token, id }: { token: string; id: string }) =>
		apiRequest({
			method: 'GET',
			url: `${API_ENDPOINTS.User}?_id=${id}&populate=manager`,
			token,
		}),
	AssignManagerToUser: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: any;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.User}/assign-manager/${id}`,
			token,
			data,
		}),
};

export default User;
