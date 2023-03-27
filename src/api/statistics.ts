import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

const statistic = async (token: string) =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}/dashboard`,
		token,
	});

export default statistic;
