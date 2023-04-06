import apiRequest from './apiRequest';
import { LoginData, ENDPOINTS } from '../utilities';

export const login = async (data: LoginData): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Staff}/login`,
		data,
	});
export const me = async (): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}/me`,
	});
