import apiRequest from './apiRequest';
import { AuditLog, DataResponse, ENDPOINTS, IApiLog } from '../utilities';

export const auditLogs = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<AuditLog[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.AuditLogs,
		params,
	});

export const apiLogs = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IApiLog[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.ApiLogs,
		params,
	});
