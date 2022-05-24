import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pages from '../pages';

const Router = () => {
	return (
		<Routes>
			<Route
				path={Pages.Dashboard.path}
				element={<Pages.Dashboard.Component />}
			/>
			<Route
				path={Pages.User.Initial.path}
				element={<Pages.User.Initial.Component />}
			/>
			<Route
				path={Pages.Auth.Login.path}
				element={<Pages.Auth.Login.Component />}
			/>
			<Route
				path={Pages.Auth.ForgetPassword.path}
				element={<Pages.Auth.ForgetPassword.Component />}
			/>
			<Route
				path={Pages.Auth.CreateNewPassword.path}
				element={<Pages.Auth.CreateNewPassword.Component />}
			/>
			<Route path={Pages.User.UserProfile.path}>
				<Route path=':id' element={<Pages.User.UserProfile.Component />} />
			</Route>
		</Routes>
	);
};

export default Router;
