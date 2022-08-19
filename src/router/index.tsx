import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Pages from '../pages';
import LINKS from '../utilities/links';
import { NetworkPageTypes } from '../utilities/types';
import PrivateRoute from '../utilities/helpers/PrivateRoute';

const Router = () => {
	return (
		<Routes>
			<Route
				path={Pages.Dashboard.path}
				element={
					<PrivateRoute>
						<Pages.Dashboard.Component />
					</PrivateRoute>
				}
			/>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />
			<Route
				path={Pages.User.Initial.path}
				element={
					<PrivateRoute>
						<Pages.User.Initial.Component />
					</PrivateRoute>
				}
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
				<Route
					path=':id'
					element={
						<PrivateRoute>
							<Pages.User.UserProfile.Component />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path={'/managers'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Managers.Component />
						</PrivateRoute>
					}
				/>

				<Route
					path={'admin'}
					element={
						<PrivateRoute>
							<Pages.Admin.Component />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route
				path={Pages.Transactions.path}
				element={
					<PrivateRoute>
						<Pages.Transactions.Component />
					</PrivateRoute>
				}
			/>
			<Route
				path={Pages.Conversions.path}
				element={
					<PrivateRoute>
						<Pages.Conversions.Component />
					</PrivateRoute>
				}
			/>
			<Route path={LINKS.Network}>
				<Route
					path={'data'}
					element={
						<PrivateRoute>
							<Pages.Network.Component
								pageType={NetworkPageTypes.DATA_NETWORK}
							/>
						</PrivateRoute>
					}
				/>
				<Route
					path={'airtime'}
					element={
						<PrivateRoute>
							<Pages.Network.Component
								pageType={NetworkPageTypes.AIRTIME_NETWORK}
							/>
						</PrivateRoute>
					}
				/>
				<Route
					path={'conversion'}
					element={
						<PrivateRoute>
							<Pages.Network.Component
								pageType={NetworkPageTypes.CONVERSION_NETWORK}
							/>
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path={LINKS.DataPlan}>
				<Route path={':plan'}>
					<Route
						path={':id'}
						element={
							<PrivateRoute>
								<Pages.ViewDataPlan.Component />
							</PrivateRoute>
						}
					/>
				</Route>
			</Route>
			<Route
				path={Pages.Coupons.path}
				element={
					<PrivateRoute>
						<Pages.Coupons.Component />
					</PrivateRoute>
				}
			/>
			<Route
				path={Pages.Dispute.path}
				element={
					<PrivateRoute>
						<Pages.Dispute.Component />
					</PrivateRoute>
				}
			/>
			<Route path={Pages.Referral.Initial.path}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Referral.Initial.Component />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<Pages.Referral.All.Component />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route path={Pages.ViewReferees.path}>
				<Route
					path=':id'
					element={
						<PrivateRoute>
							<Pages.ViewReferees.Component />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path={Pages.Notifications.Initial.path}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Notifications.Initial.Component />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<Pages.Referral.All.Component />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={Pages.Notifications.PushNotification.path}
				element={
					<PrivateRoute>
						<Pages.Notifications.PushNotification.Component />
					</PrivateRoute>
				}
			/>
			<Route path={Pages.Verification.Initial.path}>
				<Route
					path=''
					element={
						<PrivateRoute>
							<Pages.Verification.Initial.Component />
						</PrivateRoute>
					}
				/>
				<Route
					path='kyc'
					element={
						<PrivateRoute>
							<Pages.Verification.Kyc.Component />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={Pages.Suspension.path}
				element={
					<PrivateRoute>
						<Pages.Suspension.Component />
					</PrivateRoute>
				}
			/>
			<Route
				path={Pages.AuditLogs.path}
				element={
					<PrivateRoute>
						<Pages.AuditLogs.Component />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default Router;
