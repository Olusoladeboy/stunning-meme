import apiRequest from './apiRequest';
import { DataResponse, ENDPOINTS, Provider, Transaction } from '../utilities';

export const cables = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<Provider[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.AuditLogs,
		params,
	});

export const cableTransactions = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.Bills,
		params,
	});
