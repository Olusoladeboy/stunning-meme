import apiRequest from './apiRequest';
import { API_ENDPOINTS, LoginData } from '../types';

const Account = {
	Login: async (data: LoginData) =>
		apiRequest({
			method: 'POST',
			url: `${API_ENDPOINTS.Staff}/login`,
			data,
		}),
	GetUser: async (token: string) =>
		apiRequest({
			method: 'GET',
			url: `${API_ENDPOINTS.Staff}/me`,
			token,
		}),
};

export default Account;
