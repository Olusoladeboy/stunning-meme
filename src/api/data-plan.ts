import apiRequest from './apiRequest';
import { ENDPOINTS, DataPlan as DataPlanType } from '../utilities';

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
				? `${ENDPOINTS.DataPlans}?sort=${sort}&network=${network}`
				: `${ENDPOINTS.DataPlans}?sort=${sort}`,
			token,
		}),
	CreatePlan: async ({ token, data }: { token: string; data: DataPlanType }) =>
		apiRequest({
			method: 'POST',
			url: ENDPOINTS.DataPlans,
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
			url: `${ENDPOINTS.DataPlans}/${id}`,
			token,
			data,
		}),
};

export default DataPlan;
