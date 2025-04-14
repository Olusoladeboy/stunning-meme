import { useState } from 'react';
import useToastAlert from './useToastAlert';
import { queryVerifications } from 'api';
import { IVerification } from 'utilities';
import useHandleError from './useHandleError';

export const useQueryVerification = () => {
	const alert = useToastAlert();
	const handlerError = useHandleError();
	const [isLoading, setLoading] = useState<boolean>(false);
	const [verification, setVerification] = useState<IVerification[] | null>(
		null
	);
	const handler = async (params: { [key: string]: any }) => {
		setVerification(null);
		if (
			!params &&
			!(typeof params === 'object' && Object.keys(params).length > 0)
		) {
			alert({
				message: 'Invalid params',
				type: 'error',
			});
			return null;
		}
		try {
			setLoading(true);
			const res = await queryVerifications(params);
			if (res.success) {
				const data = res.payload;
				setVerification(data);
			}
		} catch (error) {
			const response = handlerError({ error });
			if (response?.message)
				alert({ message: response.message, type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	const clearVerification = () => {
		setVerification(null);
	};

	return {
		isQueryingVerification: isLoading,
		verification,
		queryVerification: handler,
		clearVerification,
	};
};
