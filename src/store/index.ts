import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme';
import appReducer from './app';
import AuthReducer from './auth';

const store = configureStore({
	reducer: {
		theme: themeReducer,
		appState: appReducer,
		authState: AuthReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
