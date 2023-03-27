import apiRequest from './apiRequest';
import { ENDPOINTS, ManagerDetailsData } from '../utilities';

interface StaffDetails extends ManagerDetailsData {
	role: string;
}

const Staff = {
	Create: async ({ token, data }: { token: string; data: StaffDetails }) =>
		apiRequest({
			method: 'POST',
			url: ENDPOINTS.Staff,
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
			url: `${ENDPOINTS.Staff}/${id}`,
			token,
			data,
		}),
	RetrieveAll: async (token: string) =>
		apiRequest({
			method: 'GET',
			url: `${ENDPOINTS.Staff}`,
			token,
			params: {
				sort: '-createdAt',
			},
		}),
};

export default Staff;
