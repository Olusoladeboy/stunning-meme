import apiRequest from './apiRequest';
import { API_ENDPOINTS, DataPlan as DataPlanType } from '../types';

const Transactions = {
	All: async ({
		token,
		sort = '-createdAt',
		params,
	}: {
		token: string;
		sort?: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: API_ENDPOINTS.Transaction,
			token,
			params: {
				sort: '-createdAt',
				...params,
			},
		}),
	CreatePlan: async ({ token, data }: { token: string; data: DataPlanType }) =>
		apiRequest({
			method: 'POST',
			url: API_ENDPOINTS.DataPlans,
			token,
			data,
		}),
	UpdatePlan: async ({
		token,
		data,
		id,
	}: {
		token: string;

		data: any;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.DataPlans}/${id}`,
			token,
			data,
		}),
};

export default Transactions;
