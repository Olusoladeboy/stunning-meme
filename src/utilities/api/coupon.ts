import apiRequest from './apiRequest';
import { API_ENDPOINTS, Coupon as ICoupon, UpdateCouponStatus } from '../types';

const Coupon = {
	RetrieveAll: async ({
		token,
		params,
	}: {
		token: string;
		params?: { [key: string]: any };
	}) =>
		apiRequest({
			method: 'GET',
			url: API_ENDPOINTS.Coupon,
			token,
			params,
		}),
	Create: async ({ token, data }: { token: string; data: ICoupon }) =>
		apiRequest({
			method: 'POST',
			url: API_ENDPOINTS.Coupon,
			token,
			data,
		}),
	Update: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: ICoupon;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.Coupon}/${id}`,
			token,
			data,
		}),
	UpdateStatus: async ({
		token,
		data,
		id,
	}: {
		token: string;
		data: UpdateCouponStatus;
		id: string;
	}) =>
		apiRequest({
			method: 'PUT',
			url: `${API_ENDPOINTS.Coupon}/status/${id}`,
			token,
			data,
		}),
};

export default Coupon;
