import apiRequest from './apiRequest';
import { ENDPOINTS, DataPlan as DataPlanType } from '../utilities';

const Wallet = {
	Account: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: ENDPOINTS.Wallet,
			token,
			params,
		}),
	Transactions: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: ENDPOINTS.Transaction,
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
	SuspendWithdraw: async ({
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
			url: `${ENDPOINTS.User}/suspend/${id}`,
			token,
			data,
		}),
};

export default Wallet;
