import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LINKS, NetworkPage } from '../utilities';
import PrivateRoute from '../utilities/helpers/PrivateRoute';
import {
	Login,
	Dashboard,
	Kyc,
	Managers,
	Network,
	Notifications,
	PushNotification,
	Admin,
	Dispute,
	Coupons,
	AllReferrals,
	AuditLogs,
	ViewDataPlan,
	ViewReferees,
	Verification,
	Message,
	Suspension,
	Transactions,
	UserProfile,
	Users,
	Conversions,
	Referrals,
	DataTypes,
	Messages,
} from '../pages';

const Router = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />

			<Route
				path={'/dashboard'}
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path={'users'}
				element={
					<PrivateRoute>
						<Users />
					</PrivateRoute>
				}
			/>
			<Route path={'auth'}>
				<Route path={'login'} element={<Login />} />
			</Route>

			<Route
				path={'user/:id'}
				element={
					<PrivateRoute>
						<UserProfile />
					</PrivateRoute>
				}
			/>
			<Route path={'managers'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Managers />
						</PrivateRoute>
					}
				/>

				<Route
					path={'admin'}
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route
				path={'transactions'}
				element={
					<PrivateRoute>
						<Transactions />
					</PrivateRoute>
				}
			/>
			<Route path={'messages'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Messages />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={'conversions'}
				element={
					<PrivateRoute>
						<Conversions />
					</PrivateRoute>
				}
			/>
			<Route path={'network'}>
				<Route
					path={'data'}
					element={
						<PrivateRoute>
							<Network pageType={NetworkPage.DATA_NETWORK} />
						</PrivateRoute>
					}
				/>
				<Route
					path={'airtime'}
					element={
						<PrivateRoute>
							<Network pageType={NetworkPage.AIRTIME_NETWORK} />
						</PrivateRoute>
					}
				/>
				<Route
					path={'conversion'}
					element={
						<PrivateRoute>
							<Network pageType={NetworkPage.CONVERSION_NETWORK} />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route path={'data-types'}>
				<Route path={':plan'}>
					<Route
						path={':id'}
						element={
							<PrivateRoute>
								<DataTypes />
							</PrivateRoute>
						}
					/>
				</Route>
			</Route>
			<Route path={'data-plan'}>
				<Route path={':plan'}>
					<Route
						path={':id'}
						element={
							<PrivateRoute>
								<ViewDataPlan />
							</PrivateRoute>
						}
					/>
				</Route>
			</Route>
			<Route
				path={'coupons'}
				element={
					<PrivateRoute>
						<Coupons />
					</PrivateRoute>
				}
			/>
			<Route
				path={'support-ticket/message/:id'}
				element={
					<PrivateRoute>
						<Message />
					</PrivateRoute>
				}
			/>
			<Route
				path={'dispute'}
				element={
					<PrivateRoute>
						<Dispute />
					</PrivateRoute>
				}
			/>
			<Route path={'referrals'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Referrals />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<AllReferrals />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route
				path={'referee/:id'}
				element={
					<PrivateRoute>
						<ViewReferees />
					</PrivateRoute>
				}
			/>
			<Route path={'notifications'}>
				<Route
					path={''}
					element={
						<PrivateRoute>
							<Notifications />
						</PrivateRoute>
					}
				/>
				<Route
					path={'all'}
					element={
						<PrivateRoute>
							<AllReferrals />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={'push-notification'}
				element={
					<PrivateRoute>
						<PushNotification />
					</PrivateRoute>
				}
			/>
			<Route path={'verification'}>
				<Route
					path=''
					element={
						<PrivateRoute>
							<Verification />
						</PrivateRoute>
					}
				/>
				<Route
					path='kyc'
					element={
						<PrivateRoute>
							<Kyc />
						</PrivateRoute>
					}
				/>
			</Route>
			<Route
				path={'suspension'}
				element={
					<PrivateRoute>
						<Suspension />
					</PrivateRoute>
				}
			/>
			<Route
				path={'audit-logs'}
				element={
					<PrivateRoute>
						<AuditLogs />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default Router;
