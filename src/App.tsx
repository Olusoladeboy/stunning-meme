import React from 'react';
import Router from './router';
import { ScrollToTop, ThemeProvider } from './utilities';
import { useLoadUser, useLoadStatistics } from './hooks';

function App() {
	useLoadUser();
	useLoadStatistics();

	return (
		<ThemeProvider>
			<ScrollToTop>
				<Router />
			</ScrollToTop>
		</ThemeProvider>
	);
}

export default App;
