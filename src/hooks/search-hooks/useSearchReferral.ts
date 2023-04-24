import { useState } from 'react';
import { useAlert, useHandleError } from '..';
import { EMAIL_REX, PHONE_REX, User, IReferral } from '../../utilities';
import { users, referrals } from '../../api';

interface SearchPayload {
	email?: string;
	phone?: string;
}

const useSearchReferral = () => {
	const alert = useAlert();
	const handleError = useHandleError();

	/* 
    @Hook state
    @User state and boolean is searching state
  */
	const [search, setSearch] = useState<IReferral[] | null>(null);
	const [isSearching, setSearching] = useState<boolean>(false);

	/*
	 *Search User
	 *Update found MUser State
	 *Handle Network error response, trigger an alert if any
	 */
	const searchReferral = async (value: string) => {
		if (!value) {
			return alert({
				message: 'Incorrect search parameter',
				type: 'info',
			});
		}

		let params = {} as SearchPayload;
		const value$ = value.trim().toLowerCase();

		if (EMAIL_REX.test(value$)) {
			params.email = value$;
		} else if (PHONE_REX.test(value$)) {
			params.phone = value$;
		} else {
			return alert({
				message: 'Search Referral with either email or phone',
				type: 'info',
			});
		}

		setSearching(true);

		try {
			const data = await users({ params });

			if (data && Array.isArray(data.payload)) {
				if (data.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Referral with ${value} not found`,
						type: 'info',
					});
				}

				const user = data.payload[0] as User;

				// setSearch(data.payload);
				const referralData = await referrals({
					params: {
						referredBy: user.id,
						populate: 'referredBy',
					},
				});

				if (referralData.payload.length === 0) {
					setSearch(null);
					return alert({
						message: `Referral with ${value} not found`,
						type: 'info',
					});
				}

				setSearch(referralData.payload);
				setSearching(false);
			}
		} catch (error) {
			const response = handleError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
			setSearching(false);
		}
	};

	/*
	 *Clear Referral state
	 */
	const clearSearch = () => setSearch(null);

	/*
	 *Returrns
	 */
	return {
		isSearching,
		searchReferral,
		search,
		clearSearch,
	};
};

export default useSearchReferral;
