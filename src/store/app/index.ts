import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Statistics, IModalAlert } from '../../utilities';

// Define the initial state using that type
const initialState: {
	isToggleDrawer: boolean;
	isToggleMobileDrawer: boolean;
	statistics: Statistics | null;
	isLoadingStatistics: boolean;
	modalAlert: IModalAlert | null;
} = {
	isToggleDrawer: true,
	statistics: null,
	isLoadingStatistics: true,
	isToggleMobileDrawer: false,
	modalAlert: null,
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setToggleDrawer: (state, action: PayloadAction<boolean>) => {
			state.isToggleDrawer = action.payload;
		},
		setToggleMobileDrawer: (state, action: PayloadAction<boolean>) => {
			state.isToggleMobileDrawer = action.payload;
		},
		setLoadingStatistics: (state, action: PayloadAction<boolean>) => {
			state.isLoadingStatistics = action.payload;
		},
		setStatistics: (state, action: PayloadAction<Statistics | null>) => {
			state.statistics = action.payload;
			state.isLoadingStatistics = false;
		},
		setModalAlert: (state, action: PayloadAction<IModalAlert | null>) => {
			const alert = action.payload;
			if (alert) {
				state.modalAlert = action.payload;
			} else {
				state.modalAlert = null;
			}
		},
	},
});

export const {
	setToggleDrawer,
	setStatistics,
	setLoadingStatistics,
	setToggleMobileDrawer,
	setModalAlert,
} = appSlice.actions;

export default appSlice.reducer;
