import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { User, EMAIL_REX, PHONE_REX } from 'utilities';
import { users } from 'api';

interface SearchPayload {
	email?: string;
	phone?: string;
	deleted?: boolean;
}

const useSearchUser = () => {
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
	const searchUser = async (value: string, deleted = false) => {
		if (!value) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}

		let params = {} as SearchPayload;
		const value$ = value.trim().toLowerCase();

		if (deleted) params.deleted = true;

		if (EMAIL_REX.test(value$)) {
			params.email = value$;
		} else if (PHONE_REX.test(value$)) {
			params.phone = value$;
		} else {
			return alert({
				message: 'Search User with email or phone',
				type: 'info',
			});
		}

		setSearching(true);

		try {
			const data = await users({ params });
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
	const clearSearch = () => setSearch(null);

	/*
	 *Returrns
	 */
	return {
		isSearching,
		searchUser,
		search,
		clearSearch,
	};
};

export default useSearchUser;
