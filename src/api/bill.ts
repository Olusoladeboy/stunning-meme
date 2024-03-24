import { Bundle, DataResponse, Provider, ENDPOINTS } from 'utilities';
import apiRequest from './apiRequest';

export const billProviders = async (
	url: string
): Promise<DataResponse<Provider[]>> =>
	apiRequest({
		url,
		method: 'GET',
	});

export const billBundles = async ({
	params,
	url,
}: {
	params: { provider?: string; service_type?: string };
	url: string;
}): Promise<DataResponse<Bundle[]>> =>
	apiRequest({
		url: `${url}/packages`,
		method: 'GET',
		params,
	});

export const billTransactions = async (params: {
	[key: string]: any;
}): Promise<any> =>
	apiRequest({
		url: `${ENDPOINTS.Bills}`,
		method: 'GET',
		params,
	});
