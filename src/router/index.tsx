import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LINKS, NetworkPage } from '../utilities';
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
	AutoConversions,
} from '../pages';

const Router = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />
			<Route path={'/dashboard'} element={<Dashboard />} />
			<Route path={'users'} element={<Users />} />
			<Route path={'auth'}>
				<Route path={'login'} element={<Login />} />
			</Route>
			<Route path={'user/:id'} element={<UserProfile />} />
			<Route path={'managers'}>
				<Route path={''} element={<Managers />} />
				<Route path={'admin'} element={<Admin />} />
			</Route>
			<Route path={'transactions'} element={<Transactions />} />
			<Route path={'messages'}>
				<Route path={''} element={<Messages />} />
			</Route>
			<Route path={'conversions'} element={<Conversions />} />
			<Route path={'auto-conversions'} element={<AutoConversions />} />
			<Route path={'network'}>
				<Route
					path={'data'}
					element={<Network pageType={NetworkPage.DATA_NETWORK} />}
				/>
				<Route
					path={'airtime'}
					element={<Network pageType={NetworkPage.AIRTIME_NETWORK} />}
				/>
				<Route
					path={'conversion'}
					element={<Network pageType={NetworkPage.CONVERSION_NETWORK} />}
				/>
			</Route>
			<Route path={'data-types'}>
				<Route path={':plan'}>
					<Route path={':id'} element={<DataTypes />} />
				</Route>
			</Route>
			<Route path={'data-plan'}>
				<Route path={':plan'}>
					<Route path={':id'} element={<ViewDataPlan />} />
				</Route>
			</Route>
			<Route path={'coupons'} element={<Coupons />} />
			<Route path={'support-ticket/message/:id'} element={<Message />} />
			<Route path={'dispute'} element={<Dispute />} />
			<Route path={'referrals'}>
				<Route path={''} element={<Referrals />} />
				<Route path={'all'} element={<AllReferrals />} />
			</Route>
			<Route path={'referee/:id'} element={<ViewReferees />} />
			<Route path={'notifications'}>
				<Route path={''} element={<Notifications />} />
				<Route path={'all'} element={<AllReferrals />} />
			</Route>
			<Route path={'push-notification'} element={<PushNotification />} />
			<Route path={'verification'}>
				<Route path='' element={<Verification />} />
				<Route path='kyc' element={<Kyc />} />
			</Route>
			<Route path={'suspension'} element={<Suspension />} />
			<Route path={'audit-logs'} element={<AuditLogs />} />
		</Routes>
	);
};

export default Router;
