import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const allTransactions = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}/all`,
		params,
	});

export const transactions = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Transaction}`,
		params,
	});

export const transactUser = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Transaction}/${id}`,
		data,
	});
