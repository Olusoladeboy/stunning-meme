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
import Notifications from './notifications';
import PushNotification from './notifications/push-notification';
import Verification from './verification';
import Kyc from './verification/kyc';
import Suspension from './suspension';
import AuditLogs from './audit-logs';
import Dispute from './dispute';
import Admin from './admin';
import Message from './dispute/message';

const Pages = {
	Auth: {
		Login,
		ForgetPassword,
		CreateNewPassword,
	},
	Dashboard,
	Users,
	UserProfile,
	Managers,
	Admin,
	Transactions,
	Conversions,
	Network,
	ViewDataPlan,
	Coupons,
	Message,
	Dispute,
	Referrals,
	AllReferrals,
	ViewReferees,
	Notifications,
	PushNotification,
	Verification,
	Kyc,
	Suspension,
	AuditLogs,
};

export default Pages;
