import apiRequest from './apiRequest';
import {
	ENDPOINTS,
	DataPlan as DataPlanType,
	DataResponse,
	DataType,
	DataPlan,
	Transaction,
} from '../utilities';
import { GenericAbortSignal } from 'axios';

export const dataPlans = async (
	params: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<DataPlan[]>> =>
	apiRequest({
		url: ENDPOINTS.DataPlans,
		method: 'GET',
		params,
		signal,
	});

export const dataSubscriptions = async (
	params: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<DataPlan[]>> =>
	apiRequest({
		url: ENDPOINTS.DataSubscription,
		method: 'GET',
		params,
		signal,
	});

export const updateDataSubscriptions = async (payload: {
	[key: string]: any;
	id: string;
}): Promise<DataResponse<DataPlan[]>> =>
	apiRequest({
		url: `${ENDPOINTS.DataSubscription}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});

export const dataTypes = async (
	params: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<DataType[]>> =>
	apiRequest({
		url: ENDPOINTS.DataTypes,
		method: 'GET',
		params,
		signal,
	});

export const createDataTypes = async (
	data: DataType,
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
	data: DataPlanType,
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

export const internationalDataSubscriptions = async (
	params: {
		[key: string]: any;
	},
	signal?: GenericAbortSignal,
): Promise<DataResponse<Transaction[]>> =>
	apiRequest({
		url: ENDPOINTS.InternationalData,
		method: 'GET',
		params,
		signal,
	});

export const updateInternationalDataSubscriptions = async (payload: {
	data: { [key: string]: any };
	id: string;
}): Promise<DataResponse<any>> =>
	apiRequest({
		url: `${ENDPOINTS.InternationalData}/${payload.id}`,
		method: 'PUT',
		data: payload.data,
	});
