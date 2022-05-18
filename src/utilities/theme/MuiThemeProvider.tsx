import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './index';
import { AppStore } from '../types';

type Props = {
	children: ReactNode;
};

const MuiThemeProvider = ({ children }: Props) => {
	// Todo Use Store
	const appTheme: any = useSelector((store: AppStore) => store.theme);

	return (
		<ThemeProvider theme={theme(appTheme.mode === 'dark')}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default MuiThemeProvider;
