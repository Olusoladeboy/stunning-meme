import apiRequest from './apiRequest';
import { ENDPOINTS } from '../utilities';

export const convertAirtimes = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.ConvertAirtime,
		params: {
			populate: 'network,user',
			sort: '-createdAt',
			...params,
		},
	});
