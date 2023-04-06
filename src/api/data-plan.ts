import apiRequest from './apiRequest';
import { ENDPOINTS, DataPlan as DataPlanType } from '../utilities';

export const dataPlans = async (params: { [key: string]: any }): Promise<any> =>
	apiRequest({
		url: ENDPOINTS.DataPlans,
		method: 'GET',
		params,
	});

export const createDataPlan = async (data: DataPlanType): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.DataPlans,
		data,
	});

export const updateDataPlan = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.DataPlans}/${id}`,
		data,
	});
