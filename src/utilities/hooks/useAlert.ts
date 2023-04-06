import { useSnackbar } from 'notistack';
import handleResponse from '../helpers/handleResponse';

type Props = {
	data: string | any;
	type?: 'error' | 'info' | 'success';
	isError?: boolean;
};

const useAlert = () => {
	const { enqueueSnackbar } = useSnackbar();

	const setAlert = ({ data, type, isError }: Props) => {
		if (typeof data === 'string') {
			enqueueSnackbar(data, { variant: type });
		} else {
			const res = handleResponse({ payload: data });
			if (res?.message) {
				enqueueSnackbar(res.message, { variant: type });
			}
		}
	};

	return setAlert;
};

export default useAlert;
