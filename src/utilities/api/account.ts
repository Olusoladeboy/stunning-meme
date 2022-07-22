import apiRequest from './apiRequest';
import { API_ENDPOINTS, LoginDataTypes } from '../types';

const Account = {
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
};

export default Account;
