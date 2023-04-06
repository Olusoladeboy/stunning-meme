import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StorageKeys, AuthState, UserDetails, Storage } from '../../utilities';

// Define the initial state using that type
const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: window !== undefined ? Storage.getItem(StorageKeys.UserToken) : null,
};

export const userSlice = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserDetails | null>) => {
			action.payload
				? (state.isAuthenticated = true)
				: (state.isAuthenticated = false);
			state.user = action.payload;
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
