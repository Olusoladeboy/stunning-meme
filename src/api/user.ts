import apiRequest from './apiRequest';
import {
	DataResponse,
	ENDPOINTS,
	LoginData,
	ManagerDetailsData,
	SuspendUser,
	User,
} from '../utilities';

export const login = async (
	data: LoginData
): Promise<DataResponse<{ user: User; token: string }>> =>
	apiRequest({
		method: 'POST',
		url: `${ENDPOINTS.Staff}/login`,
		data,
	});
export const me = async (): Promise<DataResponse<User>> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.Staff}/me`,
	});

export const createUser = async ({
	data,
}: {
	data: ManagerDetailsData;
}): Promise<any> =>
	apiRequest({
		method: 'POST',
		url: ENDPOINTS.User,

		data,
	});

export const resetPassword = async (data: {
	[key: string]: any;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.Staff}/reset-password`,
		data,
	});

export const updateUser = async ({
	data,
	id,
}: {
	data: ManagerDetailsData;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.User}/${id}`,

		data,
	});

export const users = async ({
	params,
}: {
	params?: { [key: string]: any };
}): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.User}`,

		params,
	});
export const user = async ({ id }: { id: string }): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.User}?_id=${id}&populate=manager`,
	});

export const assignManagerToUser = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.User}/assign-manager/${id}`,

		data,
	});

export const suspendUser = async ({
	data,
	id,
}: {
	data: SuspendUser;
	id: string;
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.User}/suspend/${id}`,

		data,
	});

export const verifyUser = async (id: string): Promise<any> =>
	apiRequest({
		method: 'GET',
		url: `${ENDPOINTS.User}/admin-verify/${id}`,
	});

export const activateOrDeativateUser = async ({
	id,
	data,
}: {
	id: string;
	data: {
		isActive: boolean;
	};
}): Promise<any> =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.User}/activate/${id}`,

		data,
	});

export const suspendWithdraw = async ({
	data,
	id,
}: {
	data: any;
	id: string;
}) =>
	apiRequest({
		method: 'PUT',
		url: `${ENDPOINTS.User}/suspend/${id}`,

		data,
	});

	
export const restoreDeletedAccount = async (id:string) =>
	apiRequest({
		method: 'PATCH',
		url: `${ENDPOINTS.User}/restore/${id}`,
	});
