import apiRequest from './apiRequest';
import {
	DataResponse,
	ENDPOINTS,
	User,
	IBlacklistedNumber,
} from '../utilities';

export const queryBlacklistedNumbers = async (
	params: Record<string, any>,
): Promise<DataResponse<IBlacklistedNumber[]>> =>
	apiRequest({ url: ENDPOINTS.Blacklist, method: 'GET', params });

export const createBlacklistNumber = async (data: {
	phone_number: string;
	reason: string;
}): Promise<DataResponse<IBlacklistedNumber>> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Blacklist,
		data,
	});

export const updateBlacklistedNumber = async ({
	data,
	id,
}: {
	data: {
		isActive: boolean;
		services: string[];
	};
	id: string;
}): Promise<DataResponse<IBlacklistedNumber>> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Blacklist}/${id}`,
		data,
	});
export const deleteBlacklistedNumber = async (
	id: string,
): Promise<DataResponse<IBlacklistedNumber>> =>
	apiRequest({
		method: 'DELETE',
		url: `${ENDPOINTS.Blacklist}/${id}`,
	});
