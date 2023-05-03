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

export const updateConvertAirtimeStatus = async ({
	id,
	data,
}: {
	id: string;
	data: { status: string };
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.ConvertAirtime}/operation/${id}`,
		data,
	});
