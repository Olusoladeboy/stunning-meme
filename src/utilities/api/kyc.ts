import apiRequest from './apiRequest';
import { API_ENDPOINTS } from '../types';

const KycLimits = {
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
};

export default KycLimits;
