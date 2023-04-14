import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { Ticket } from '../../utilities';
import { tickets } from '../../api';

interface SearchPayload {
	code?: string;
}

const useSearchTicket = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Ticket state and boolean is searching state
  */
	const [search, setSearch] = useState<Ticket[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/* 
    @Search Ticket
    @Update found Ticket State
    @Handle Network error response, trigger an alert if any
  */
	const searchTicket = async (value: string) => {
		let params = {} as SearchPayload;
		const value$ = value.trim();
		params.code = value$;

		if (!value$) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await tickets({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Ticket not found`,
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
    @Clear Ticket state
  */
	const clearSearch = () => setSearch(null);

	/* 
  @Returns
*/
	return {
		isSearching,
		searchTicket,
		search,
		clearSearch,
	};
};

export default useSearchTicket;
