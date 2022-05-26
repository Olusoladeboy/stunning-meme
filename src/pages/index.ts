import Login from './auth/login';
import Dashboard from './dashboard';
import ForgetPassword from './auth/forget-password';
import CreateNewPassword from './auth/create-new-password';
import Users from './users';
import UserProfile from './users/profile';
import Managers from './managers';
import Transactions from './transactions';
import Conversions from './conversions';
import Network from './network';
import ViewDataPlan from './view-data-plan';
import Coupons from './coupons';
import Referrals from './referrals';
import ViewReferees from './view-referees';
import AllReferrals from './referrals/all-referrals';

import LINKS from '../utilities/links';

const Pages = {
	Auth: {
		Login: {
			Component: Login,
			path: '/auth/login',
		},
		ForgetPassword: {
			Component: ForgetPassword,
			path: '/auth/forget-password',
		},
		CreateNewPassword: {
			Component: CreateNewPassword,
			path: LINKS.CreateNewPassword,
		},
	},
	Dashboard: {
		Component: Dashboard,
		path: LINKS.Dashboard,
	},
	User: {
		Initial: {
			Component: Users,
			path: LINKS.Users,
		},
		UserProfile: {
			Component: UserProfile,
			path: LINKS.User,
		},
	},
	Managers: {
		Component: Managers,
		path: LINKS.Managers,
	},
	Transactions: {
		Component: Transactions,
		path: LINKS.Transactions,
	},
	Conversions: {
		Component: Conversions,
		path: LINKS.Conversions,
	},
	Network: {
		Component: Network,
		path: LINKS.DataNetwork,
	},
	ViewDataPlan: {
		Component: ViewDataPlan,
		path: LINKS.DataPlan,
	},
	Coupons: {
		Component: Coupons,
		path: LINKS.Coupons,
	},
	Referral: {
		Initial: {
			Component: Referrals,
			path: LINKS.Referrals,
		},
		All: {
			Component: AllReferrals,
			path: LINKS.AllReferrals,
		},
	},
	ViewReferees: {
		Component: ViewReferees,
		path: LINKS.Referee,
	},
};

export default Pages;
