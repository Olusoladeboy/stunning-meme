import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { ManagerDetailsData, EMAIL_REX } from '../../utilities';
import { managers } from '../../api';

interface SearchPayload {
	email?: string;
}

const useSearchManager = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Manager state and boolean is searching state
  */
	const [search, setSearch] = useState<ManagerDetailsData[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/* 
    @Search Manager
    @Update found Mmanager State
    @Handle Network error response, trigger an alert if any
  */
	const searchManager = async (value: string) => {
		let params = {} as SearchPayload;
		const value$ = value.trim().toLowerCase();
		if (EMAIL_REX.test(value$)) params.email = value$;

		if (Object.keys(params).length === 0) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await managers({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Manager with ${value} not found`,
						type: 'info',
					});
				}

				setSearch(data.payload);
			}
		} catch (error) {
			setSearching(false);

			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		}
	};

	/* 
    @Clear Manager state
  */
	const clearSearch = () => setSearch(null);

	/* 
  @Returrns
*/
	return {
		isSearching,
		searchManager,
		search,
		clearSearch,
	};
};

export default useSearchManager;
