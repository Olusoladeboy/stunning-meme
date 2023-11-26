import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { apiLogs } from 'api';

interface SearchPayload {
	reference?: string;
	populate?: string;
}

const useSearchApiLog = (callback?: () => void) => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Transaction state and boolean is searching state
  */
	const [search, setSearch] = useState<{ [key: string]: any } | null>(null);
	const [isSearchingApiLog, setSearchingApiLog] = useState<boolean>(false);

	/* 
    @Search Transaction
    @Update found Transaction State
    @Handle Network error response, trigger an alert if any
  */
	const searchApiLog = async (value: string) => {
		let params = {
			populate: 'user',
		} as SearchPayload;
		const referenceRegExp = /\w{10}/gi;
		if (referenceRegExp.test(value)) params.reference = value;

		if (Object.keys(params).length === 0) {
			setSearch(null);
			return alert({
				message: 'Incorrect search parameter, enter a valid reference number',
				type: 'info',
			});
		}
		setSearchingApiLog(true);

		try {
			const data = await apiLogs(params);
			setSearchingApiLog(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					return alert({ message: 'Api log not found', type: 'info' });
				}

				setSearch(data.payload);
				typeof callback !== 'undefined' && callback();
				// console.log(data.payload);
			}
		} catch (error) {
			setSearchingApiLog(false);

			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		}
	};

	/* 
    @Clear Transaction state
  */
	const clearSearch = () => setSearch(null);

	/* 
  @Returrns
*/
	return {
		isSearchingApiLog,
		searchApiLog,
		apiLog: search,
		clearSearch,
	};
};

export default useSearchApiLog;
