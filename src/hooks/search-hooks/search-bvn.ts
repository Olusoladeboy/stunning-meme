import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { IBvnVerification } from 'utilities';
import { bvnVerifications } from 'api';

const useSearchBvn = (callback?: (data: IBvnVerification) => void) => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @User state and boolean is searching state
  */
	const [search, setSearch] = useState<IBvnVerification | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

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
			if (data && data.success) {
				if (
					data.payload.success &&
					Object.keys(data.payload.response).length > 0
				) {
					const response = data.payload.response as IBvnVerification;
					setSearch(response);
					typeof callback === 'function' && callback(response);
				} else {
					alert({ message: data.payload.response as string, type: 'error' });
				}
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
