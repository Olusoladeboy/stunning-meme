import apiRequest from './apiRequest';
import { API_ENDPOINTS, ManagerDetailsDataTypes } from '../types';

interface StaffDetails extends ManagerDetailsDataTypes {
	role: string;
}

const Staff = {
	Create: async ({ token, data }: { token: string; data: StaffDetails }) =>
		apiRequest({
			method: 'POST',
			url: API_ENDPOINTS.Staff,
			token,
			data,
		}),
	Update: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: StaffDetails;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.Staff}/${id}`,
			token,
			data,
		}),
	RetrieveAll: async (token: string) =>
		apiRequest({
			method: 'GET',
			url: `${API_ENDPOINTS.Staff}`,
			token,
			params: {
				sort: '-createdAt',
			},
		}),
};

export default Staff;
