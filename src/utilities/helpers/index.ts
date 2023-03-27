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
	if (match && Array.isArray(match) && match[0] === name) {
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
