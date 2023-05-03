import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { Coupon } from 'utilities';
import { coupons } from 'api';

interface SearchPayload {
	name?: string;
}

const useSearchCoupon = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @Coupon state and boolean is searching state
  */
	const [search, setSearch] = useState<Coupon[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/* 
    @Search Coupon
    @Update found Coupon State
    @Handle Network error response, trigger an alert if any
  */
	const searchCoupon = async (value: string) => {
		let params = {} as SearchPayload;
		const value$ = value.trim();

		params.name = value$;

		if (Object.keys(params).length === 0) {
			setSearch(null);
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}
		setSearching(true);

		try {
			const data = await coupons({ params });
			setSearching(false);
			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					return alert({
						message: `Coupon not found`,
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
    @Clear Coupon state
  */
	const clearSearch = () => setSearch(null);

	/* 
  @Returns
*/
	return {
		isSearching,
		searchCoupon,
		search,
		clearSearch,
	};
};

export default useSearchCoupon;
