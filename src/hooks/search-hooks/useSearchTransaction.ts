import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { Transaction } from 'utilities';
import { allTransactions } from 'api';

interface SearchPayload {
	reference?: string;
}

const useSearchTransaction = (callback?: () => void) => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Transaction state and boolean is searching state
  */
	const [search, setSearch] = useState<Transaction[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/* 
    @Search Transaction
    @Update found Transaction State
    @Handle Network error response, trigger an alert if any
  */
	const searchTransaction = async (value: string) => {
		let params = {} as SearchPayload;
		const referenceRegExp = /\w{10}/gi;
		if (referenceRegExp.test(value)) params.reference = value;

		if (Object.keys(params).length === 0) {
			setSearch(null);
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await allTransactions({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					return alert({ message: 'Transaction not found', type: 'info' });
				}

				setSearch(data.payload);
				typeof callback !== 'undefined' && callback();
				// console.log(data.payload);
			}
		} catch (error) {
			setSearching(false);

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
		isSearching,
		searchTransaction,
		search,
		clearSearch,
	};
};

export default useSearchTransaction;
