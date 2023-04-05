import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData } from '../utilities';

interface StaffDetails extends ManagerDetailsData {
	role: string;
}

export const createStaff = async (data: StaffDetails): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Staff,
		data,
	});

export const updateStaff = async ({
	data,
	id,
}: {
	data: StaffDetails;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Staff}/${id}`,
		data,
	});

export const staffs = async ({ params }: { params: any }): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}`,
		params,
	});
