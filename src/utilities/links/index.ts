const LINKS = {
	Dashboard: '/dashboard',
	Login: '/auth/login',
	ForgetPassword: '/auth/forget-password',
	CreateNewPassword: '/auth/password/new',
	Users: '/users',
	User: `/user`,
	Managers: '/managers',
	Transactions: '/transactions',
	Conversions: '/conversions',
	Network: '/network',
	DataNetwork: '/network/data',
	ConversionNetwork: '/network/conversion',
	DataPlan: '/data-plan',
	AirtimeNetwork: '/network/airtime',
	Coupons: '/coupons',
	Referrals: '/referrals',
	AllReferrals: '/referrals/all',
	Referee: '/referee',
	Notifications: '/notifications',
	PushNotification: '/push-notification',
	Verification: '/verification',
	KycVerification: '/verification/kyc',
	Suspension: '/suspension',
	AuditLogs: '/audit-logs',
};

export const DRAWER_LINKS = {
	Dashboard: {
		name: 'Dashboard',
		path: LINKS.Dashboard,
	},
};

export default LINKS;
