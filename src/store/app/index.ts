import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statistics } from '../../utilities/types';

// Define the initial state using that type
const initialState: {
	isToggleDrawer: boolean;
	statistics: Statistics | null;
	isLoadingStatistics: boolean;
} = {
	isToggleDrawer: true,
	statistics: null,
	isLoadingStatistics: true,
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setToggleDrawer: (state, action: PayloadAction<boolean>) => {
			state.isToggleDrawer = action.payload;
		},
		setLoadingStatistics: (state, action: PayloadAction<boolean>) => {
			state.isLoadingStatistics = action.payload;
		},
		setStatistics: (state, action: PayloadAction<Statistics | null>) => {
			state.statistics = action.payload;
			state.isLoadingStatistics = false;
		},
	},
});

export const { setToggleDrawer, setStatistics, setLoadingStatistics } =
	appSlice.actions;

export default appSlice.reducer;
