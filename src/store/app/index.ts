import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
	isToggleDrawer: true,
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setToggleDrawer: (state, action: PayloadAction<boolean>) => {
			state.isToggleDrawer = action.payload;
		},
	},
});

export const { setToggleDrawer } = appSlice.actions;

export default appSlice.reducer;
