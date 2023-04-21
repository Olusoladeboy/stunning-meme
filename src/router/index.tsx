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
	AuditLogs,
	ViewDataPlan,
	Referees,
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
	Statistics,
	AllTransactions,
	AllConversions,
	ReferralsBonus,
} from '../pages';

const Router = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={LINKS.Dashboard} replace />} />
			<Route path={'/dashboard'} element={<Dashboard />} />
			<Route path={'users'}>
				<Route path={''} element={<Users />} />
				<Route path={':id'} element={<UserProfile />} />
			</Route>
			<Route path={'auth'}>
				<Route path={'login'} element={<Login />} />
			</Route>
			<Route path={'managers'}>
				<Route path={''} element={<Managers />} />
				<Route path={'admin'} element={<Admin />} />
			</Route>
			<Route path={'transactions'}>
				<Route path={''} element={<Transactions />} />
				<Route path={'all'} element={<AllTransactions />} />
			</Route>
			<Route path={'messages'}>
				<Route path={''} element={<Messages />} />
			</Route>
			<Route path={'conversions'}>
				<Route path={''} element={<Conversions />} />
				<Route path={'all'} element={<AllConversions />} />
			</Route>
			<Route path={'auto-conversions'} element={<AutoConversions />} />
			<Route path={'data-network'}>
				<Route
					path={''}
					element={<Network pageType={NetworkPage.DATA_NETWORK} />}
				/>
				<Route path={'types/:plan/:id'} element={<DataTypes />} />
				<Route path={'plans/:plan/:id'} element={<ViewDataPlan />} />
			</Route>

			<Route
				path={'airtime-network'}
				element={<Network pageType={NetworkPage.AIRTIME_NETWORK} />}
			/>
			<Route path={'statistics'} element={<Statistics />} />

			<Route path={'coupons'} element={<Coupons />} />
			<Route path={'support-ticket/message/:id'} element={<Message />} />
			<Route path={'dispute'} element={<Dispute />} />
			<Route path={'referrals'}>
				<Route path={''} element={<Referrals />} />
				<Route path={':id/referees'} element={<Referees />} />
				<Route path={'bonus'} element={<ReferralsBonus />} />
			</Route>

			<Route path={'notifications'}>
				<Route path={''} element={<Notifications />} />
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
