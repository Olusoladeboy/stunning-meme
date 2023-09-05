import apiRequest from './apiRequest';
import { AuditLog, DataResponse, ENDPOINTS, Provider } from '../utilities';

export const cables = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<Provider[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.AuditLogs,
		params,
	});
