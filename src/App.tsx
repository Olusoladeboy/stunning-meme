import React from 'react';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import ThemeProvider from './utilities/theme/MuiThemeProvider';
import Router from './router';
import ScrollToTop from './utilities/helpers/ScrollToTop';
import { QueryKeyTypes } from './utilities/types';
import Api from './utilities/api';
import { useAppSelector, useAppDispatch } from './store/hooks';
import handleResponse from './utilities/helpers/handleResponse';
import { setToken, setUser } from './store/auth';
import { setLoadingStatistics, setStatistics } from './store/app';

function App() {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const logOut = () => {
		dispatch(setUser(null));
		setToken(null);
	};

	const { token } = useAppSelector((store) => store.authState);

	useQuery(QueryKeyTypes.Statistics, () => Api.Statistic(token as string), {
		enabled: !!token,
		onSettled: (data, error) => {
			if (error) {
				dispatch(setLoadingStatistics(false));
			}

			if (data && data.success) {
				dispatch(setStatistics(data.payload));
			}
		},
	});

	useQuery(
		QueryKeyTypes.LoginUserDetails,
		() => Api.Account.GetUser(token || ''),
		{
			enabled: !!token,
			onSettled: (data, error) => {
				if (error) {
					const res = handleResponse({
						error,
						isDisplayMessage: true,
						handler: logOut,
					});
					if (res?.message) {
						enqueueSnackbar(res.message, { variant: 'error' });
					}
				}
				if (data && data.success) {
					if (Array.isArray(data.payload) && data.payload.length > 0) {
						dispatch(setUser(data.payload[0]));
					} else {
						dispatch(setUser(data.payload));
					}
				}
			},
		}
	);
	return (
		<ThemeProvider>
			<ScrollToTop>
				<Router />
			</ScrollToTop>
		</ThemeProvider>
	);
}

export default App;
