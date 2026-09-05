import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const kycs = async (): Promise<any> =>
	apiRequest({ url: ENDPOINTS.Kyc, method: 'GET' });

export const updateKyc = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<any> =>
	apiRequest({
		url: `${ENDPOINTS.Kyc}/${id}`,
		method: 'PUT',
		data,
	});
