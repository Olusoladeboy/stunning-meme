import { useMutation, MutationFunction, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import handleResponse from '../../helpers/handleResponse';

type OptionType = {
	isDisplayMessage?: boolean;
	onSuccessFn?: (data: any) => void;
	invalidatePayload?: string | string[];
};

const useMutationHook = (
	mutateFn: MutationFunction,
	mutateOptions?: OptionType
) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const { isDisplayMessage, invalidatePayload, onSuccessFn }: OptionType =
		typeof mutateOptions !== 'undefined' ? mutateOptions : {};

	const queryResponse = useMutation(mutateFn, {
		onSettled: (data: any, error) => {
			if (error) {
				const res = handleResponse({ payload: error, isDisplayMessage });
				if (res?.message) {
					enqueueSnackbar(res.message, { variant: 'error' });
				}
			}

			if (data && data.success) {
				if (typeof invalidatePayload !== 'undefined') {
					if (Array.isArray(invalidatePayload)) {
						invalidatePayload.forEach((query) => {
							queryClient.invalidateQueries(query);
						});
					} else {
						queryClient.invalidateQueries(invalidatePayload);
					}
				}
				typeof onSuccessFn !== 'undefined' && onSuccessFn(data);
				if (isDisplayMessage) {
					enqueueSnackbar(data.message, { variant: 'error' });
				}
			}
		},
	});

	return queryResponse;
};

export default useMutationHook;
