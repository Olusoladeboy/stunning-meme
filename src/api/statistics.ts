import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const statistic = async (): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}/dashboard`,
	});
