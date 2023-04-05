import { HttpStatusCode } from '../constant';
import { Storage, StorageKeys } from '..';

type PropsType = {
	payload: any;
	handler?: () => void;
	isDisplayMessage?: boolean;
};

type ReturnTypes = {
	data: any;
	message: string | null;
};

const handleResponse = ({
	payload,
	handler,
	isDisplayMessage = false,
}: PropsType): ReturnTypes | null | undefined => {
	if (payload.response !== 'undefined' && payload.response.data) {
		const data = payload.response.data;
		const status = payload.response.status;

		if (status) {
			switch (status) {
				case HttpStatusCode.OK:
					return { data, message: isDisplayMessage ? data.message : null };
				case HttpStatusCode.Forbidden:
					Storage.deleteItem(StorageKeys.UserToken);
					typeof handler !== 'undefined' && handler();
					return { data, message: data.message };

				case HttpStatusCode.BadRequest:
					return { data, message: data.message };

				case HttpStatusCode.Unauthorized:
					Storage.deleteItem(StorageKeys.UserToken);
					typeof handler !== 'undefined' && handler();
					return { data, message: data.message };

				case HttpStatusCode.NotFound:
					return { data, message: data.message };

				default:
					return null;
			}
		} else {
			return null;
		}
	} else {
		return payload.message;
	}
};

export default handleResponse;
