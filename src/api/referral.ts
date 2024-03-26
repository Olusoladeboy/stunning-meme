import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const referrals = async ({
	params,
}: {
	params: { [key: string]: any };
}): Promise<any> =>
	apiRequest({ url: ENDPOINTS.Referrals, method: 'GET', params });

export const searchReferrals = async (params: {
	[key: string]: any;
}): Promise<any> =>
	apiRequest({ url: `${ENDPOINTS.Referrals}/search`, method: 'GET', params });
