import { HttpStatusCodeTypes } from '../types';
import handleErrorMessage from './handleErrorMessage';

type PropsType = {
	data: any;
	handler?: any;
};

const handleResponse = ({ data: { response }, handler }: PropsType) => {
	const status = response.errors[0].extensions.response.statusCode;
	if (status) {
		switch (status) {
			case HttpStatusCodeTypes.OK:
				return {
					msg: handleErrorMessage(response),
				};
			case HttpStatusCodeTypes.Forbidden:
				typeof handler !== 'undefined' && handler();
				return {
					msg: handleErrorMessage(response),
				};

			case HttpStatusCodeTypes.BadRequest:
				return {
					msg: handleErrorMessage(response),
				};

			case HttpStatusCodeTypes.Unauthorized:
				typeof handler !== 'undefined' && handler();
				return {
					msg: handleErrorMessage(response),
				};

			case HttpStatusCodeTypes.NotFound:
				return {
					msg: handleErrorMessage(response),
				};

			default:
				return null;
		}
	} else {
		return null;
	}
};

export default handleResponse;
