import { useState } from 'react';
import {
	coupons,
	transactions,
	adBanners,
	airtimeTransactions,
	convertAirtimes,
	autoConvertAirtimes,
	networks,
	dataPlans,
	dataTypes,
	voucherTransactions,
	eSimTransactions,
	ePinTransactions,
	bankFundings,
	settings,
	referrals,
	walletTransfers,
	user,
	walletAccount,
	walletWithdrawal,
	dataSubscriptions,
	managers,
	staffs,
	internationalAirtimeTransactions,
	internationalDataSubscriptions,
} from 'api';
import { API_ENDPOINTS, MODULE_NAMES } from 'utilities';
import { useHandleError, useAlert } from 'hooks';

interface IProps {
	module: string;
	recordId: string;
}

// networks({
// 	url: API_ENDPOINTS.AirtimeNetwork,
// }),

const useAuditLogViewAction = (
	callback?: (data: { [key: string]: any }) => void
) => {
	const handleError = useHandleError();
	const alert = useAlert();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handler = async (module: string, recordId: string) => {
		let data;
		switch (module) {
			case MODULE_NAMES.COUPON:
				data = await coupons({
					_id: recordId,
				});
				break;

			case MODULE_NAMES.TRANSACTION:
				data = await transactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.ADVERT:
				data = await adBanners({
					id: recordId,
				});
				break;

			case MODULE_NAMES.AIRTIME:
				data = await airtimeTransactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.DATASUBSCRIPTION:
				data = await dataSubscriptions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.AIRTIMECONVERT:
				data = await convertAirtimes({
					id: recordId,
				});
				break;

			case MODULE_NAMES.AIRTIMEAUTOCONVERT:
				data = await autoConvertAirtimes({
					id: recordId,
				});
				break;

			case MODULE_NAMES.DATANETWORK:
				data = await networks({
					url: API_ENDPOINTS.DataNetwork,
					params: {
						id: recordId,
					},
				});
				break;

			case MODULE_NAMES.DATAPLAN:
				data = await dataPlans({
					id: recordId,
				});
				break;

			case MODULE_NAMES.DATATYPE:
				data = await dataTypes({
					id: recordId,
				});
				break;

			case MODULE_NAMES.MANAGER:
				data = await managers({
					id: recordId,
				});
				break;
			case MODULE_NAMES.STAFF:
				data = await staffs({
					id: recordId,
				});
				break;

			case MODULE_NAMES.USER:
				data = await user({
					id: recordId,
				});
				break;

			case MODULE_NAMES.EVOUCHER:
				data = await voucherTransactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.ESIM:
				data = await eSimTransactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.EPIN:
				data = await ePinTransactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.SETTING:
				data = await settings({
					id: recordId,
				});
				break;

			case MODULE_NAMES.TRANSFER:
				data = await walletTransfers({
					id: recordId,
				});
				break;

			case MODULE_NAMES.REFERRALS:
				data = await referrals({
					id: recordId,
				});
				break;

			case MODULE_NAMES.INTERNATIONALAIRTIME:
				data = await internationalAirtimeTransactions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.INTERNATIONALDATA:
				data = await internationalDataSubscriptions({
					id: recordId,
				});
				break;

			case MODULE_NAMES.WITHDRAW:
				data = await walletWithdrawal({
					id: recordId,
				});
				break;

			case MODULE_NAMES.WALLET:
				data = await walletAccount({
					id: recordId,
				});
				break;

			default:
				break;
		}

		return data;
	};

	const auditLogViewAction = async ({ module, recordId }: IProps) => {
		try {
			setLoading(true);
			const response = await handler(module, recordId);

			if (response && response.success) {
				const payload = response.payload;
				let data;
				if (Array.isArray(payload)) {
					data = payload[0];
				} else {
					data = payload;
				}
				typeof callback === 'function' && callback(data);
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
