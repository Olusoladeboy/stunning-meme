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
	DataTypes: '/data-types',
	AirtimeNetwork: '/network/airtime',
	Coupons: '/coupons',
	Dispute: '/dispute',
	Referrals: '/referrals',
	AllReferrals: '/referrals/all',
	Referee: '/referee',
	Notifications: '/notifications',
	PushNotification: '/push-notification',
	Verification: '/verification',
	BvnVerification: '/verification/bvn',
	KycVerification: '/verification/kyc',
	Suspension: '/suspension',
	AuditLogs: '/audit-logs',
	ApiLogs: '/api-logs',
	Message: '/support-ticket/message',
	Messages: '/messages',
};

export const DRAWER_LINKS = {
	Dashboard: {
		name: 'Dashboard',
		path: LINKS.Dashboard,
	},
};

export default LINKS;
