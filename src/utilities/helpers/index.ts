import { Amount, Coupon, CouponType } from '../types';
export { default as ErrorBoundary } from './error-boundary';
export { default as ScrollToTop } from './scroll-to-top';
export * from './reg-expression';

export const calculatePercentageAmount = ({
	rate,
	amount,
}: {
	rate: string | number;
	amount: string | number;
}) => {
	const parseRate = typeof rate === 'string' ? parseInt(rate) : rate;
	const parseAmount = typeof amount === 'string' ? parseInt(amount) : amount;

	return parseAmount - (parseAmount * parseRate) / 100;
};

export const getActiveLink = ({
	name,
	currentPath: pathname,
}: {
	name: string;
	currentPath: string;
}) => {
	const actualPathName = pathname.split('/')[1];

	const url_path = window && window.location.pathname;
	const regExp = new RegExp(name, 'ig');

	const match = url_path.match(regExp);

	if (actualPathName === '' && name === 'dashboard') {
		return {
			path: 'home',
			isActive: true,
		};
	}
	if (match && Array.isArray(match) && match[0] === actualPathName) {
		return {
			isActive: true,
		};
	} else {
		return {
			path: null,
			isActive: false && pathname.split('/')[1],
		};
	}
};

export const formatNumberToCurrency = (value: string | number) =>
	`₦${value.toString().replace(/\B(?=(?=\d*)(\d{3})+(?!\d))/g, ',')}`;

export const Storage = {
	saveItem: (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getItem: (key: string) => {
		const value = localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}

		return null;
	},
	deleteItem: (key: string) => {
		localStorage.removeItem(key);
	},
};

export const getCoupon = (coupon: Coupon) => {
	const gift =
		coupon.type === CouponType.PERCENT
			? `${coupon.gift}%`
			: coupon.type === CouponType.AMOUNT
			? formatNumberToCurrency(coupon.gift as string)
			: '';
	return `${coupon.code}-${gift}`;
};

export const cleanString = (value: string) => {
	if (value) {
		return value.replace(/_-*/gi, ' ');
	}

	return value;
};

export const checkAmount = (amount: number | string | Amount) => {
	if (typeof amount === 'object') {
		return amount.$numberDecimal;
	}

	return amount;
};

export const checkTransactionAmount = ({
	transaction,
	field,
}: {
	transaction: any;
	field: string;
}) => {
	if (transaction && transaction.transaction) {
		return checkAmount(transaction.transaction[field]);
	}

	if (transaction[field]) return checkAmount(transaction[field]);

	return 0;
};

export const cleanObject = (object: { [key: string]: any }) => {
	let output = object;
	const objectKeys = Object.keys(output);
	if (objectKeys.length === 0) return {};

	for (let i of objectKeys) {
		if (output[i] === '' || !output[i]) {
			delete output[i];
		}
	}
	return output;
};
