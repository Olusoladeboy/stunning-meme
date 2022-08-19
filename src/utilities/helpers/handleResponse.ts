import { HttpStatusCodeTypes } from '../types';
import Storage from '../storage';
import { StorageKeys } from '../types';

type PropsType = {
	error: any;
	handler?: () => void;
	isDisplayMessage?: boolean;
};

type ReturnTypes = {
	data: any;
	message: string | null;
};

const handleResponse = ({
	error,
	handler,
	isDisplayMessage = false,
}: PropsType): ReturnTypes | null | undefined => {
	if (error.response !== 'undefined' && error.response.data) {
		const data = error.response.data;
		const status = error.response.status;

		if (status) {
			switch (status) {
				case HttpStatusCodeTypes.OK:
					return { data, message: isDisplayMessage ? data.message : null };
				case HttpStatusCodeTypes.Forbidden:
					Storage.deleteItem(StorageKeys.UserToken);
					typeof handler !== 'undefined' && handler();
					return { data, message: data.message };

				case HttpStatusCodeTypes.BadRequest:
					return { data, message: data.message };

				case HttpStatusCodeTypes.Unauthorized:
					Storage.deleteItem(StorageKeys.UserToken);
					typeof handler !== 'undefined' && handler();
					return { data, message: data.message };

				case HttpStatusCodeTypes.NotFound:
					return { data, message: data.message };

				default:
					return null;
			}
		} else {
			return null;
		}
	} else {
		return error.message;
	}
};

export default handleResponse;
