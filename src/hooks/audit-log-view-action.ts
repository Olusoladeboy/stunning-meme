import { useState } from 'react';
import { coupons, transactions } from 'api';
import { MODULE_NAMES } from 'utilities';
import { useHandleError, useAlert } from 'hooks';

interface IProps {
	module: string;
	recordId: string;
	// callback?: (data: { [key: string]: any }) => void;
}

const useAuditLogViewAction = (
	callback?: (data: { [key: string]: any }) => void
) => {
	const handleError = useHandleError();
	const alert = useAlert();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handler = async (module: string, recordId: string) => {
		switch (module) {
			case MODULE_NAMES.COUPON:
				const data = await coupons({
					_id: recordId,
				});

				return data;

			default:
				break;
		}
	};

	const auditLogViewAction = async ({ module, recordId }: IProps) => {
		try {
			setLoading(true);
			const response = await handler(module, recordId);

			if (response && response.success) {
				const payload = response.payload;
				typeof callback === 'function' && callback(payload);
			}
		} catch (error) {
			const response = handleError({ error });
			if (response?.message) {
				alert({
					message: response.message,
					type: 'error',
				});
			}
		} finally {
			setLoading(false);
		}
	};

	return {
		auditLogViewAction,
		isLoadingAuditLogViewAction: isLoading,
	};
};

export default useAuditLogViewAction;
