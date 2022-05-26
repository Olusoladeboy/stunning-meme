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
	DataPlan: '/data-plan',
	AirtimeNetwork: '/network/airtime',
	Coupons: '/coupons',
	Referral: '/referrals',
	Notifications: '/notifications',
	Verification: '/verification',
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
