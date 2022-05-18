import Storage from '../storage';
import { StorageKeys } from '../types';

const baseUrl = process.env.REACT_APP_BASE_URL as string;

const token = Storage.getItem(StorageKeys.UserToken);

const Api = {
	Account: {
		Login: async () => {
			console.log('Login');
		},
	},
};

export default Api;
