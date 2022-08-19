import { useReducer } from 'react';
import apiRequest from '../apiRequest';

type QueryProps = {
	url: string;
	token?: string;
	params?: { [key: string]: any };
	method?: string;
	onSettled?: (data: any, error: any) => void;
};

const useApiRequest = ({ url, token, params, onSettled }: QueryProps) => {
	const [state, setState] = useReducer((_: any, action: any) => action, {
		isLoading: false,
	});

	const request = async (payload?: any) => {
		setState({ isLoading: true });
		try {
			const data = await apiRequest({ url, token, params, data: payload });
			setState({ isSuccess: true, data, isLoading: false });
		} catch (error) {
			setState({ isError: true, error, isLoading: false });
		}
	};

	if (typeof onSettled !== 'undefined') {
		if (state.data || state.error) {
			onSettled(state.data, state.error);
		}
	}

	return {
		...state,
		request,
	};
};

export default useApiRequest;
