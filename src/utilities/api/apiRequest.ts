import axios, { AxiosRequestConfig } from 'axios';
import { StorageKeys } from '../types';
import Storage from '../storage';

const baseURL = '';

const apiRequest = async (config?: AxiosRequestConfig) => {
	const token = Storage.getItem(StorageKeys.UserToken);
	if (token) {
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		axios.defaults.headers.delete['Authorization'];
	}

	const res = await axios({
		url: config?.url,
		baseURL: baseURL,
		method: config?.method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			token: token ? token : '',
		},
		data: config?.data,
	});

	return res.data;
};

export default apiRequest;
