import apiRequest from './apiRequest';
import { AuditLog, DataResponse, ENDPOINTS } from '../utilities';

export const auditLogs = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<AuditLog[]>> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.AuditLogs,
		params,
	});
