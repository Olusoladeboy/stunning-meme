import apiRequest from './apiRequest';
import { API_ENDPOINTS, DataPlan as DataPlanType } from '../types';

const DataPlan = {
	Plans: async ({
		token,
		sort = '-createdAt',
		network,
	}: {
		token: string;
		sort?: string;
		network?: string;
	}) =>
		apiRequest({
			method: 'GET',
			url: network
				? `${API_ENDPOINTS.DataPlans}?sort=${sort}&network=${network}`
				: `${API_ENDPOINTS.DataPlans}?sort=${sort}`,
			token,
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

export default DataPlan;
