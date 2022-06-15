import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from '../../utilities/storage';
import { StorageKeys, AuthStateTypes } from '../../utilities/types';

// Define the initial state using that type
const initialState: AuthStateTypes = {
	isAuthenticated: false,
	user: null,
	token: window !== undefined ? Storage.getItem(StorageKeys.UserToken) : null,
};

export const userSlice = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ [key: string]: any } | null>) => {
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
	},
});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
