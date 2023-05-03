import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const referrals = async ({
	params,
}: {
	params: { [key: string]: any };
}): Promise<any> =>
	apiRequest({ url: ENDPOINTS.Referrals, method: 'GET', params });
