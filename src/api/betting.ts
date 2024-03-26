import apiRequest from './apiRequest';
import { IPurchasedBill, DataResponse, ENDPOINTS } from '../utilities';

export const bettingAdmin = async (): Promise<DataResponse<IPurchasedBill[]>> =>
	apiRequest({
		url: `${ENDPOINTS.IPurchasedBill}?type=BETTING`,
		method: 'GET',
	});
