import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { User } from 'utilities';
import { bvnVerifications } from 'api';

const useSearchBvn = (callback?: (data: { [key: string]: any }) => void) => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @User state and boolean is searching state
  */
	const [search, setSearch] = useState<User[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/*
	 *Search User
	 *Update found MUser State
	 *Handle Network error response, trigger an alert if any
	 */
	const searchUser = async (value: string) => {
		if (!value) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}

		const params = {
			bvn: value,
		};

		setSearching(true);

		try {
			const data = await bvnVerifications(params);
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `User with ${value} not found`,
						type: 'info',
					});
				}

				setSearch(data.payload);
				typeof callback === 'function' && callback(data.payload);
			}
		} catch (error) {
			setSearching(false);

			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		}
	};

	/*
	 *Clear User state
	 */
	const clearBvnSearch = () => setSearch(null);

	/*
	 *Returrns
	 */
	return {
		isSearchingBvn: isSearching,
		searchBvn: searchUser,
		searchedBvn: search,
		clearBvnSearch,
	};
};

export default useSearchBvn;
