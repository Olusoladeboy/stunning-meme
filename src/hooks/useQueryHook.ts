import { useQuery, QueryFunction, QueryKey } from 'react-query';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '../store/hooks';
import useHandleError from './useHandleError';
import useToastAlert from './useToastAlert';

interface Props {
	enabled?: boolean;
	queryFn: QueryFunction;
	queryKey: QueryKey;
	isDisplayMessage?: boolean;
	onSuccessFn?: (data: any) => void;
	keepPreviousData?: boolean;
}

const useQueryHook = ({
	queryKey,
	queryFn,
	enabled,
	isDisplayMessage = false,
	keepPreviousData,
	onSuccessFn,
}: Props) => {
	const query_key = typeof queryKey !== 'undefined' ? queryKey : '';
	const { enqueueSnackbar } = useSnackbar();
	const { token } = useAppSelector((store) => store.authState);
	const handleError = useHandleError();
	const alert = useToastAlert();

	const queryResponse = useQuery(query_key, queryFn, {
		enabled: !!token || enabled,
		keepPreviousData,
		onSettled: (data: any, error) => {
			if (error) {
				const res = handleError({ error });
				if (res?.message) {
					alert({ message: res.message, type: 'error' });
				}
			}

			if (data && data.success) {
				typeof onSuccessFn !== 'undefined' && onSuccessFn(data);
				if (isDisplayMessage) {
					enqueueSnackbar(data.message, { variant: 'error' });
				}
			}
		},
	});

	return queryResponse;
};

export default useQueryHook;
