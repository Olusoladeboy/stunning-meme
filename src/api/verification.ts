import apiRequest from './apiRequest';
import {
	DataResponse,
	ENDPOINTS,
	IVerification,
	IBvnVerification,
} from '../utilities';

interface ResponseBVNVerification {
	response: IBvnVerification | string;
	success: boolean;
}

export const verifications = async (
	params: Record<string, any>
): Promise<DataResponse<IVerification[]>> =>
	apiRequest({ url: ENDPOINTS.Verification, method: 'GET', params });

export const queryVerifications = async (
	params: Record<string, any>
): Promise<DataResponse<IVerification[]>> =>
	apiRequest({ url: `${ENDPOINTS.Verification}/q`, method: 'GET', params });

export const bvnVerifications = async (
	params: Record<string, any>
): Promise<DataResponse<ResponseBVNVerification>> =>
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
