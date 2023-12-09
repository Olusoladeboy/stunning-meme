import { Transaction, User } from '../types';
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
		if (transaction.transaction[field])
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

export const truncateText = (text: string, length: number = 20): string => {
	if (text.length > length) {
		return `${text.substring(0, length)}...`;
	}

	return text;
};

export const userName = (firstname: string, lastname: string) => {
	let name = '';
	if (firstname) name += firstname;
	if (lastname) name = name ? name + ` ${lastname}` : lastname;

	if (name) return name;

	return 'No name available';
};

export const extractTransactionType = (transaction: Transaction) => {
	const type = transaction.name
		? transaction.name
		: transaction.type
		? transaction.type
		: transaction.transaction
		? transaction.transaction.type
		: '';
	return type;
};

export const extractExactTransactionService = (transaction: Transaction) => {
	const service = transaction.service
		? transaction.service
		: transaction.transaction
		? transaction.transaction.service
		: 'No available services';

	return service;
};

export const extractUserName = (user: User) => {
	let name = '';
	if (user.firstname) name += user.firstname;
	if (user.lastname) name = name ? name + ` ${user.lastname}` : user.lastname;

	if (name) return name;
	if (user.username) return user.username;

	return 'No name available';
};
