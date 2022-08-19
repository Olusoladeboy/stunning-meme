import apiRequest from './apiRequest';
import { API_ENDPOINTS } from '../types';

const statistic = async (token: string) =>
	apiRequest({
		method: 'GET',
		url: `${API_ENDPOINTS.Staff}/dashboard`,
		token,
	});

export default statistic;
