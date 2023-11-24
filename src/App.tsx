import React from 'react';
import Router from './router';
import { ScrollToTop, ThemeProvider } from './utilities';
import { useLoadUser, useLoadStatistics } from './hooks';
import { ModalAlert } from './components';

function App() {
	useLoadUser();
	useLoadStatistics();

	return (
		<ThemeProvider>
			<ScrollToTop>
				<ModalAlert />
				<Router />
			</ScrollToTop>
		</ThemeProvider>
	);
}

export default App;
