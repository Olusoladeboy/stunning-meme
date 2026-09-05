import apiRequest from './apiRequest';
import { ENDPOINTS, Notification, DataResponse } from '../utilities';

export const notifications = async ({
	params,
}: {
	params: { [key: string]: any };
}): Promise<DataResponse<Notification[]>> =>
	apiRequest({ url: ENDPOINTS.Notification, method: 'GET', params });

export const createNotification = async (
	data: Notification
): Promise<DataResponse<Notification>> =>
	apiRequest({ url: ENDPOINTS.Notification, method: 'POST', data });

export const updateNotification = async ({
	data,
	id,
}: {
	data: Notification;
	id: string;
}): Promise<DataResponse<Notification>> =>
	apiRequest({ url: `${ENDPOINTS.Notification}/${id}`, method: 'PUT', data });

export const deleteNotification = async (
	id: string
): Promise<DataResponse<any>> =>
	apiRequest({ url: `${ENDPOINTS.Notification}/${id}`, method: 'DELETE' });
