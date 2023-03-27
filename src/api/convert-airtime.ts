import apiRequest from './apiRequest';
import { LoginData, ENDPOINTS } from '../utilities';

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
			url: ENDPOINTS.ConvertAirtime,
			token,
			params: {
				populate: 'network,user',
				sort: '-createdAt',
				...params,
			},
		}),
};

export default ConvertAirtime;
