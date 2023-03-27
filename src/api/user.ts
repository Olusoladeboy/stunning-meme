import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData, SuspendUser } from '../utilities';

const User = {
	CreateUser: async ({
		token,
		data,
	}: {
		token: string;
		data: ManagerDetailsData;
	}) =>
		apiRequest({
			method: 'POST',
			url: ENDPOINTS.User,
			token,
			data,
		}),
	UpdateUser: async ({
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
			url: `${ENDPOINTS.User}/${id}`,
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
			url: `${ENDPOINTS.User}`,
			token,
			params,
		}),
	GetUserById: async ({ token, id }: { token: string; id: string }) =>
		apiRequest({
			method: 'GET',
			url: `${ENDPOINTS.User}?_id=${id}&populate=manager`,
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
			url: `${ENDPOINTS.User}/assign-manager/${id}`,
			token,
			data,
		}),
	SuspendUser: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: SuspendUser;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${ENDPOINTS.User}/suspend/${id}`,
			token,
			data,
		}),
	VerifyUser: async ({ token, id }: { token: string; id: string }) =>
		apiRequest({
			method: 'GET',
			url: `${ENDPOINTS.User}/admin-verify/${id}`,
			token,
		}),
	ActivateOrDeativateUser: async ({
		token,
		id,
		data,
	}: {
		token: string;
		id: string;
		data: {
			isActive: boolean;
		};
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${ENDPOINTS.User}/activate/${id}`,
			token,
			data,
		}),
};

export default User;
