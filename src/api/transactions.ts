import apiRequest from './apiRequest';
import { ENDPOINTS, DataPlan as DataPlanType } from '../utilities';

const Transactions = {
	All: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: `${ENDPOINTS.Transaction}/all`,
			token,
			params,
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
	TransactUser: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: any;
		id: string;
	}) =>
		apiRequest({
			method: 'POST',
			url: `${ENDPOINTS.Transaction}/${id}`,
			token,
			data,
		}),
};

export default Transactions;
