const LINKS = {
	Dashboard: '/',
	Login: '/auth/login',
	ForgetPassword: '/auth/forget-password',
	CreateNewPassword: '/auth/password/new',
	Users: '/users',
	User: `/user`,
	Managers: '/managers',
	Transactions: '/transactions',
	Conversions: '/conversions',
	DataNetwork: '/data-network',
	AirtimeNetwork: '/airtime-network',
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
