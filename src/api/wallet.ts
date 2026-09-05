import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, IWallet } from '../utilities';

export const walletAccount = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IWallet>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.Wallet,
		params,
	});

export const updateLien = async ({
	id,
	data,
}: {
	id: string;
	data: { lien: string; type: string };
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Wallet}/lien/${id}`,
		data,
	});
