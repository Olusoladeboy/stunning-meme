import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URI as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

interface ConfigTypes extends AxiosRequestConfig {
	token?: string;
}

const apiRequest = async (config?: ConfigTypes) => {
	const token = config?.token || '';

	const res = await axios({
		url: config?.url,
		baseURL: BASE_URL,
		method: config?.method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			apikey: API_KEY,
		},
		data: config?.data,
	});

	return res.data;
};

export default apiRequest;
