import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import appReducer from './app';

const store = configureStore({
	reducer: {
		theme: themeReducer,
		appState: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
