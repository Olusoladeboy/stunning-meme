import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Pages from '../pages';
import LINKS from '../utilities/links';
import { NetworkPageTypes } from '../utilities/types';

const Router = () => {
	return (
		<Routes>
			<Route
				path={Pages.Dashboard.path}
				element={<Pages.Dashboard.Component />}
			/>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />
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
			<Route
				path={Pages.Managers.path}
				element={<Pages.Managers.Component />}
			/>
			<Route
				path={Pages.Transactions.path}
				element={<Pages.Transactions.Component />}
			/>
			<Route
				path={Pages.Conversions.path}
				element={<Pages.Conversions.Component />}
			/>
			<Route path={LINKS.Network}>
				<Route
					path={'data'}
					element={
						<Pages.Network.Component pageType={NetworkPageTypes.DATA_NETWORK} />
					}
				/>
				<Route
					path={'airtime'}
					element={
						<Pages.Network.Component
							pageType={NetworkPageTypes.AIRTIME_NETWORK}
						/>
					}
				/>
			</Route>
			<Route path={LINKS.DataPlan}>
				<Route path={':plan'} element={<Pages.ViewDataPlan.Component />} />
			</Route>
			<Route path={Pages.Coupons.path} element={<Pages.Coupons.Component />} />
			<Route path={Pages.Referral.Initial.path}>
				<Route path={''} element={<Pages.Referral.Initial.Component />} />
				<Route path={'all'} element={<Pages.Referral.All.Component />} />
			</Route>

			<Route path={Pages.ViewReferees.path}>
				<Route path=':id' element={<Pages.ViewReferees.Component />} />
			</Route>
		</Routes>
	);
};

export default Router;
