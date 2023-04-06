import apiRequest from './apiRequest';
import { ENDPOINTS, Coupon as ICoupon, UpdateCouponStatus } from '../utilities';

export const coupons = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: ENDPOINTS.Coupon,

		params,
	});

export const createCoupon = async (data: ICoupon): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.Coupon,

		data,
	});

export const updateCoupon = async ({
	data,
	id,
}: {
	data: ICoupon;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Coupon}/${id}`,
		data,
	});

export const updateCouponStatus = async ({
	data,
	id,
}: {
	data: UpdateCouponStatus;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Coupon}/status/${id}`,
		data,
	});
