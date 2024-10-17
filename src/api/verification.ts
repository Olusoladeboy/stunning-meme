import apiRequest from './apiRequest';
import {
	DataResponse,
	ENDPOINTS,
	IVerification,
	IBvnVerification,
} from '../utilities';

export const verifications = async (
	params: Record<string, any>
): Promise<DataResponse<IVerification[]>> =>
	apiRequest({ url: ENDPOINTS.Verification, method: 'GET', params });

export const bvnVerifications = async (
	params: Record<string, any>
): Promise<DataResponse<IBvnVerification>> =>
	apiRequest({ url: `${ENDPOINTS.Verification}/okra`, method: 'GET', params });

export const updateVerification = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<DataResponse<any>> =>
	apiRequest({
		url: `${ENDPOINTS.Verification}/${id}`,
		method: 'PUT',
		data,
	});
