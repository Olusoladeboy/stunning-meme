import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import ThemeProvider from './utilities/theme/MuiThemeProvider';
import Router from './router';
import ScrollToTop from './utilities/helpers/ScrollToTop';

function App() {
	return (
		<ThemeProvider>
			<ScrollToTop>
				<Router />
			</ScrollToTop>
		</ThemeProvider>
	);
}

export default App;
