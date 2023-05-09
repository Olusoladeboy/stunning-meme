import apiRequest from './apiRequest';
import {
	ENDPOINTS,
	DataPlan as DataPlanType,
	DataResponse,
	DataType,
	DataPlan,
} from '../utilities';

export const dataPlans = async (params: {
	[key: string]: any;
}): Promise<DataResponse<DataPlan[]>> =>
	apiRequest({
		url: ENDPOINTS.DataPlans,
		method: 'GET',
		params,
	});

export const dataTypes = async (params: {
	[key: string]: any;
}): Promise<DataResponse<DataType[]>> =>
	apiRequest({
		url: ENDPOINTS.DataTypes,
		method: 'GET',
		params,
	});

export const createDataTypes = async (
	data: DataType
): Promise<DataResponse<DataType>> =>
	apiRequest({
		url: ENDPOINTS.DataTypes,
		method: 'POST',
		data,
	});

export const updateDataType = async ({
	id,
	data,
}: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<DataType>> =>
	apiRequest({
		url: `${ENDPOINTS.DataTypes}/${id}`,
		method: 'PUT',
		data,
	});

export const createDataPlan = async (
	data: DataPlanType
): Promise<DataResponse<DataPlanType>> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.DataPlans,
		data,
	});

export const updateDataPlan = async ({
	data,
	id,
}: {
	data: DataPlan;
	id: string;
}): Promise<DataResponse<DataPlan>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.DataPlans}/${id}`,
		data,
	});
