import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

const container: any = document.getElementById('root');
const root = createRoot(container);

const RootApp = () => {
	const queryClient = new QueryClient();

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<SnackbarProvider
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						autoHideDuration={3000}
						maxSnack={3}
					>
						<App />
					</SnackbarProvider>
				</BrowserRouter>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</Provider>
	);
};

root.render(
	<React.StrictMode>
		<RootApp />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
