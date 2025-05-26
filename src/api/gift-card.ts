import apiRequest from './apiRequest';
import { ENDPOINTS, DataResponse, Transaction } from '../utilities';

export const giftCardTransactions = async (params: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.GiftCard,
		method: 'GET',
		params,
	});

export const updateGiftCardTransactions = async (payload: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: `${ENDPOINTS.GiftCard}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});
