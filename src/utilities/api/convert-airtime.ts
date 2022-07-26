import apiRequest from './apiRequest';
import { API_ENDPOINTS } from '../types';

const ConvertAirtime = {
	Records: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: API_ENDPOINTS.ConvertAirtime,
			token,
			params: {
				populate: 'network,user',
				sort: '-createdAt',
				...params,
			},
		}),
};

export default ConvertAirtime;
