import apiRequest from './apiRequest';
import {
	ENDPOINTS,
	IBusiness,
	DataResponse,
	ICommission,
	IActivation,
} from '../utilities';

export const businesses = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IBusiness[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Business}`,
		params,
	});

export const businessCommissions = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<ICommission[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Commissions}`,
		params,
	});

export const businessActivations = async (params?: {
	[key: string]: any;
}): Promise<DataResponse<IActivation[]>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Activations}`,
		params,
	});

export const createBusinessCommissions = async (data?: {
	[key: string]: any;
}): Promise<DataResponse<ICommission>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Commissions}`,
		data,
	});

export const deleteBusinessCommissions = async (
	id: string
): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'DELETE',
		url: `${ENDPOINTS.Commissions}/${id}`,
	});

export const updateBusinessCommissions = async ({
	id,
	data,
}: {
	id: string;
	data: {
		rate: number;
	};
}): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Commissions}/${id}`,
		data,
	});

export const deleteBusiness = async (id: string): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'DELETE',
		url: `${ENDPOINTS.Business}/${id}`,
	});

export const updateBusiness = async ({
	id,
	data,
}: {
	id: string;
	data: {
		status: string;
	};
}): Promise<DataResponse<any>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Business}/${id}`,
		data,
	});
