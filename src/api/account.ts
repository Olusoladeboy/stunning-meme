import apiRequest from './apiRequest';
import { LoginData, ENDPOINTS } from '../utilities';

const Account = {
	Login: async (data: LoginData) =>
		apiRequest({
			method: 'POST',
			url: `${ENDPOINTS.Staff}/login`,
			data,
		}),
	GetUser: async (token: string) =>
		apiRequest({
			method: 'GET',
			url: `${ENDPOINTS.Staff}/me`,
			token,
		}),
};

export default Account;
