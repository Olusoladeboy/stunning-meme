import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Pages from '../pages';
import LINKS from '../utilities/links';
import { NetworkPage } from '../utilities/types';
import PrivateRoute from '../utilities/helpers/PrivateRoute';

const Router = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />

			<Route
				path={'/dashboard'}
				element={
					<PrivateRoute>
						<Pages.Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path={'users'}
				element={
					<PrivateRoute>
						<Pages.Users />
					</PrivateRoute>
				}
			/>
			<Route path={'auth'}>
				<Route path={'login'} element={<Pages.Auth.Login />} />
			</Route>

			<Route
				path={'user/:id'}
				element={
					<PrivateRoute>
						<Pages.UserProfile />
					</PrivateRoute>
				}
			/>
			<Route path={'managers'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Managers />
						</PrivateRoute>
					}
				/>

				<Route
					path={'admin'}
					element={
						<PrivateRoute>
							<Pages.Admin />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route
				path={'transactions'}
				element={
					<PrivateRoute>
						<Pages.Transactions />
					</PrivateRoute>
				}
			/>
			<Route
				path={'conversions'}
				element={
					<PrivateRoute>
						<Pages.Conversions />
					</PrivateRoute>
				}
			/>
			<Route path={'network'}>
				<Route
					path={'data'}
					element={
						<PrivateRoute>
							<Pages.Network pageType={NetworkPage.DATA_NETWORK} />
						</PrivateRoute>
					}
				/>
				<Route
					path={'airtime'}
					element={
						<PrivateRoute>
							<Pages.Network pageType={NetworkPage.AIRTIME_NETWORK} />
						</PrivateRoute>
					}
				/>
				<Route
					path={'conversion'}
					element={
						<PrivateRoute>
							<Pages.Network pageType={NetworkPage.CONVERSION_NETWORK} />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path={'data-plan'}>
				<Route path={':plan'}>
					<Route
						path={':id'}
						element={
							<PrivateRoute>
								<Pages.ViewDataPlan />
							</PrivateRoute>
						}
					/>
				</Route>
			</Route>
			<Route
				path={'coupons'}
				element={
					<PrivateRoute>
						<Pages.Coupons />
					</PrivateRoute>
				}
			/>
			<Route
				path={'support-ticket/message/:id'}
				element={
					<PrivateRoute>
						<Pages.Message />
					</PrivateRoute>
				}
			/>
			<Route
				path={'dispute'}
				element={
					<PrivateRoute>
						<Pages.Dispute />
					</PrivateRoute>
				}
			/>
			<Route path={'referrals'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Referrals />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<Pages.AllReferrals />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route
				path={'referee/:id'}
				element={
					<PrivateRoute>
						<Pages.ViewReferees />
					</PrivateRoute>
				}
			/>
			<Route path={'notifications'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Pages.Notifications />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<Pages.AllReferrals />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={'push-notification'}
				element={
					<PrivateRoute>
						<Pages.PushNotification />
					</PrivateRoute>
				}
			/>
			<Route path={'verification'}>
				<Route
					path=''
					element={
						<PrivateRoute>
							<Pages.Verification />
						</PrivateRoute>
					}
				/>
				<Route
					path='kyc'
					element={
						<PrivateRoute>
							<Pages.Kyc />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={'suspension'}
				element={
					<PrivateRoute>
						<Pages.Suspension />
					</PrivateRoute>
				}
			/>
			<Route
				path={'audit-logs'}
				element={
					<PrivateRoute>
						<Pages.AuditLogs />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default Router;
