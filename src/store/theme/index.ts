import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Storage from '../../utilities/storage';
import { StorageKeys, ThemeModeType } from '../../utilities/types';

export type ThemeState = {
	mode: ThemeModeType;
};

// Define the initial state using that type
const initialState: ThemeState = {
	mode:
		window !== undefined && Storage.getItem(StorageKeys.themeMode)
			? Storage.getItem(StorageKeys.themeMode)
			: ThemeModeType.light,
};

export const counterSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ThemeModeType>) => {
			Storage.saveItem(StorageKeys.themeMode, action.payload);
			state.mode = action.payload;
		},
	},
});

export const { setTheme } = counterSlice.actions;

export default counterSlice.reducer;
