import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from '../../utilities/storage';
import { StorageKeys } from '../../utilities/types';

// Define the initial state using that type
const initialState = {
	isAuthenticated: false,
	user: null,
};

export const userSlice = createSlice({
	name: 'authState',
	initialState,
	reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
