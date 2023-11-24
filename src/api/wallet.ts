import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const walletAccount = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.Wallet,
		params,
	});
