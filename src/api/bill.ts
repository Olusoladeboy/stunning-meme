import {
	API_ENDPOINTS,
	Bundle,
	DataResponse,
	IBill,
	Provider,
} from 'utilities';
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
