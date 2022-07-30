import { useQuery, QueryFunction, QueryKey } from 'react-query';
import { useSnackbar } from 'notistack';
import handleResponse from '../../helpers/handleResponse';

interface Props {
	enabled?: boolean;
	queryFn: QueryFunction;
	queryKey: QueryKey;
	isDisplayMessage?: boolean;
}

const useQueryHook = ({
	queryKey,
	queryFn,
	enabled,
	isDisplayMessage = false,
}: Props) => {
	const query_key = typeof queryKey !== 'undefined' ? queryKey : '';
	const { enqueueSnackbar } = useSnackbar();

	const queryResponse = useQuery(query_key, queryFn, {
		enabled,
		onSettled: (data: any, error) => {
			if (error) {
				const res = handleResponse({ error, isDisplayMessage });
				if (res?.message) {
					enqueueSnackbar(res.message, { variant: 'error' });
				}
			}

			if (data && data.success) {
				if (isDisplayMessage) {
					enqueueSnackbar(data.message, { variant: 'error' });
				}
			}
		},
	});

	return queryResponse;
};

export default useQueryHook;
