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
	AutoConversions,
	Statistics,
	// AllTransactions,
	AllConversions,
	ReferralsBonus,
	CreateNotification,
	ChangePassword,
	BvnVerification,
	ApiLogs,
	NinVerification,
	AutoConversionDetails,
	AdBanner,
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
				<Route path={'password/change'} element={<ChangePassword />} />
				<Route path={'forget-password'} element={<ChangePassword />} />
			</Route>
			<Route path={'managers'}>
				<Route path={''} element={<Managers />} />
				<Route path={'admin'} element={<Admin />} />
			</Route>
			<Route path={'transactions'}>
				<Route path={''} element={<Transactions />} />
				{/* <Route path={'all'} element={<AllTransactions />} /> */}
			</Route>

			<Route path={'conversions'}>
				<Route path={''} element={<Conversions />} />
				<Route path={'all'} element={<AllConversions />} />
				<Route
					path={'network'}
					element={<Network pageType={NetworkPage.CONVERSION_NETWORK} />}
				/>
			</Route>
			<Route path={'auto-conversions'}>
				<Route path={''} element={<AutoConversions />} />
				<Route path={':id'} element={<AutoConversionDetails />} />
				<Route
					path={'network'}
					element={<Network pageType={NetworkPage.AUTO_CONVERSION_NETWORK} />}
				/>
			</Route>
			<Route path={'data-network'}>
				<Route
					path={''}
					element={<Network pageType={NetworkPage.DATA_NETWORK} />}
				/>
				<Route path={'types/:dataTypeName/:network'} element={<DataTypes />} />
				<Route
					path={'plans/:dataType/:planName/:network'}
					element={<ViewDataPlan />}
				/>
			</Route>

			<Route
				path={'airtime-network'}
				element={<Network pageType={NetworkPage.AIRTIME_NETWORK} />}
			/>
			<Route path={'statistics'} element={<Statistics />} />

			<Route path={'coupons'} element={<Coupons />} />
			<Route path={'dispute'}>
				<Route path={''} element={<Dispute />} />
				<Route path={':id'} element={<Message />} />
			</Route>
			<Route path={'referrals'}>
				<Route path={''} element={<Referrals />} />
				<Route path={':email/referees'} element={<Referees />} />
				<Route path={'bonus'} element={<ReferralsBonus />} />
			</Route>

			<Route path={'notifications'}>
				<Route path={''} element={<Notifications />} />
				<Route path={'create'} element={<CreateNotification />} />
			</Route>
			<Route path={'verification'}>
				<Route path='' element={<Verification />} />
				<Route path='kyc' element={<Kyc />} />
			</Route>
			<Route path='bvn-verification' element={<BvnVerification />} />
			<Route path='nin-verification' element={<NinVerification />} />
			<Route path={'suspension'} element={<Suspension />} />
			<Route path={'audit-logs'} element={<AuditLogs />} />
			<Route path={'api-logs'} element={<ApiLogs />} />
			<Route path={'ad-banners'} element={<AdBanner />} />
		</Routes>
	);
};

export default Router;
