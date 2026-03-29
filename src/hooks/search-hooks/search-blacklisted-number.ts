import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { PHONE_REX, IBlacklistedNumber } from 'utilities';
import { queryBlacklistedNumbers } from 'api/blacklist';

interface SearchPayload {
	phone_number?: string;
}

export const useSearchBlacklistedNumber = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @User state and boolean is searching state
  */
	const [search, setSearch] = useState<IBlacklistedNumber[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/*
	 *Search blacklisted number
	 *Update found Blacklisted State
	 *Handle Network error response, trigger an alert if any
	 */
	const onSearch = async (value: string) => {
		if (!value) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}

		let params = {} as SearchPayload;
		const value$ = value.trim().toLowerCase();

		if (PHONE_REX.test(value$)) {
			params.phone_number = value$;
		} else {
			return alert({
				message: 'Search with phone number',
				type: 'info',
			});
		}

		try {
			setSearching(true);
			const data = await queryBlacklistedNumbers(params);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Blacklisted with ${value} not found`,
						type: 'info',
					});
				}

				setSearch(data.payload);
			}
		} catch (error) {
			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		} finally {
			setSearching(false);
		}
	};

	/*
	 *Clear Blacklisted state
	 */
	const clearSearch = () => setSearch(null);

	/*
	 *Returrns
	 */
	return {
		isSearching,
		onSearch,
		search,
		clearSearch,
	};
};
