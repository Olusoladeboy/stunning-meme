import apiRequest from './apiRequest';
import { ENDPOINTS, Coupon as ICoupon, UpdateCouponStatus } from '../utilities';

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
			url: ENDPOINTS.Coupon,
			token,
			params,
		}),
	Create: async ({ token, data }: { token: string; data: ICoupon }) =>
		apiRequest({
			method: 'POST',
			url: ENDPOINTS.Coupon,
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
			url: `${ENDPOINTS.Coupon}/${id}`,
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
			url: `${ENDPOINTS.Coupon}/status/${id}`,
			token,
			data,
		}),
};

export default Coupon;
