import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageKeys, AuthState, User, Storage, ADMIN_ROLE } from 'utilities';

// Define the initial state using that type
const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: window !== undefined ? Storage.getItem(StorageKeys.UserToken) : null,
	canViewStatistics: false,
};

export const userSlice = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			const user = action.payload;
			user ? (state.isAuthenticated = true) : (state.isAuthenticated = false);
			state.user = action.payload;
			if (user) {
				const canViewStatistics = user.role !== ADMIN_ROLE.CUSTOMER_SUPPORT;
				state.canViewStatistics = canViewStatistics;
			}
		},
		setToken: (state, action: PayloadAction<string | null>) => {
			if (action.payload === null) {
				Storage.deleteItem(StorageKeys.UserToken);
			} else {
				Storage.saveItem(StorageKeys.UserToken, action.payload);
			}
			state.token = action.payload;
		},
		logout: (state) => {
			Storage.deleteItem(StorageKeys.UserToken);
			state.isAuthenticated = false;
			state.token = '';
			state.user = null;
		},
	},
});

export const { setToken, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
