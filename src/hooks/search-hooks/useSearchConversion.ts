import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { PHONE_REX, AirtimeConversion, TEN_CHARACTERS } from 'utilities';
import { convertAirtimes } from 'api';

interface SearchPayload {
	phone_number?: string;
	reference?: string;
}

const useSearchConversion = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Conversion state and boolean is searching state
  */
	const [search, setSearch] = useState<AirtimeConversion[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/* 
    @Search Conversion
    @Update found Conversion State
    @Handle Network error response, trigger an alert if any
  */
	const searchConversion = async (value: string) => {
		let params = {} as SearchPayload;
		const value$ = value.trim();
		if (PHONE_REX.test(value$)) {
			params.phone_number = value$;
		} else if (TEN_CHARACTERS.test(value$)) {
			params.reference = value$;
		}

		if (Object.keys(params).length === 0) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await convertAirtimes({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Conversion not found`,
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
    @Clear Conversion state
  */
	const clearSearch = () => setSearch(null);

	/* 
  @Returns
*/
	return {
		isSearching,
		searchConversion,
		search,
		clearSearch,
	};
};

export default useSearchConversion;
