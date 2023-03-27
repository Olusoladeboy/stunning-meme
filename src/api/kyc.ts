import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

const KycLimits = {
	Retrieve: async (token: string) =>
		apiRequest({ url: ENDPOINTS.Kyc, method: 'GET', token }),
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
			url: `${ENDPOINTS.Kyc}/${id}`,
			method: 'PUT',
			token,
			data,
		}),
};

export default KycLimits;
