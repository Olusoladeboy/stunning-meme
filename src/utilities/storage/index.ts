const Storage = {
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

export default Storage;
