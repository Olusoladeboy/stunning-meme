import { useSnackbar } from 'notistack';
import handleResponse from '../helpers/handleResponse';

type Props = {
	alert: string | any;
	type?: 'error' | 'info' | 'success';
	isError?: boolean;
};

const useAlert = () => {
	const { enqueueSnackbar } = useSnackbar();

	const setAlert = ({ alert, type, isError }: Props) => {
		if (isError) {
			const res = handleResponse({ error: alert });
			if (res?.message) {
				enqueueSnackbar(res.message, { variant: 'error' });
			}
		} else {
			enqueueSnackbar(alert, { variant: type });
		}
	};

	return setAlert;
};

export default useAlert;
