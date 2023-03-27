import apiRequest from './apiRequest';
import { NetworkData } from '../utilities';

const Network = {
	GetNetwork: async ({
		token,
		url,
		sort = '-createdAt',
	}: {
		token: string;
		url: string;
		sort?: string;
	}) =>
		apiRequest({
			method: 'GET',
			url: `${url}?sort=${sort}`,
			token,
		}),
	CreateNetwork: async ({
		token,
		url,
		data,
	}: {
		token: string;
		url: string;
		data: NetworkData;
	}) =>
		apiRequest({
			method: 'POST',
			url,
			token,
			data,
		}),
	UpdateNetwork: async ({
		token,
		url,
		data,
		id,
	}: {
		token: string;
		url: string;
		data: NetworkData;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${url}/${id}`,
			token,
			data,
		}),
};

export default Network;
