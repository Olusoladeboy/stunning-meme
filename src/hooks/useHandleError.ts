import { HttpStatusCode } from '../utilities';
import useLogout from './useLogoutUser';

type PropsType = {
	error: any;
	callback?: () => void;
};

type ReturnTypes = {
	data?: any;
	message: string | null;
};

const useHandleError = () => {
	const logout = useLogout();

	return ({ error, callback }: PropsType): ReturnTypes | null | undefined => {
		if (
			error &&
			error.response &&
			error.response !== 'undefined' &&
			error.response.data
		) {
			const data = error.response.data;
			const status = error.response.status;

			if (status) {
				switch (status) {
					case HttpStatusCode.Unauthorized:
					case HttpStatusCode.Forbidden:
					case HttpStatusCode.TooManyRequest:
						typeof callback !== 'undefined' && callback();
						logout();
						if (typeof data === 'string') {
							return { message: data };
						}
						return { data, message: data.message || 'Authorization error' };

					case HttpStatusCode.OK:
					case HttpStatusCode.NotFound:
					case HttpStatusCode.InternalServerError:
					case HttpStatusCode.BadRequest:
						if (typeof data === 'string') {
							return { message: data };
						}
						return {
							data,
							message: data.message || 'Something went wrong, try again',
						};

					default:
						return null;
				}
			} else {
				return null;
			}
		} else {
			return { message: error.message, data: null };
		}
	};
};

export default useHandleError;
