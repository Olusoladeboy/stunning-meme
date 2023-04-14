export const PRIMARY_COLOR = '#28536B';
export const LIGHT_PRIMARY_COLOR = '#FDEDD7';
export const SECOUNDARY_COLOR = '#F38D04';
export const TRANSITION = 'all 0.3s';
export const DRAWER_WIDTH = '280px';
export const MIN_DRAWER_WIDTH = '80px';
export const PENDING_COLOR = '#30AF9F';
export const DANGER_COLOR = '#E84E51';
export const SUCCESS_COLOR = '#389651';
export const LIGHT_GRAY = '#DCE3E7';
export const HEADER_HEIGHT = '70px';
export const DARK_BACKGROUND_COLOR = '#09171f';
export const BOX_SHADOW = `0px 0px 8px rgba(0, 0, 0, 0.1)`;
export const MAX_RECORDS = 20;

export const QueryKeys = {
	LoginUserDetails: '@Query:Login_user_details',
	AllManagers: '@Query:All_manager',
	RecentConvertAirtime: '@Query:RecentConvertAirtime',
	AllUsers: '@Query:All_Users',
	GetSingleUser: '@Query:Get_single_user',
	DataNetwork: '@Query:Data_Network',
	ConvertNetwork: '@Query:Convert_Network',
	ConvertAirtime: '@Query:Convert_Airtime',
	AirtimeNetwork: '@Query:Airtime_Network',
	KycLimit: '@Query:Kyc_Limit',
	DataPlans: '@Query:Data_Plans',
	UserWallet: '@Query:User_Wallet',
	UserWalletTransaction: '@Query:User_Wallet_Transaction',
	UserTransactions: '@Query:User_Transactions',
	AllTransactions: '@Query:All_Transactions',
	RecentTransactions: '@Query:Recent_Transactions',
	AllStaff: '@Query:All_Staff',
	Statistics: '@Query:Statistics',
	Coupon: '@Query:Coupon',
	Tickets: '@Query:Tickets',
	Ticket: '@Query:Ticket',
	Me: '@Query:Me',
};

export const StorageKeys = {
	themeMode: '@Storage_theme_mode',
	UserToken: '@Storage:user_token',
	UserDetails: '@Storage:user_details',
	Application: '@Storage:key_application',
	SignUpDetails: '@Storage:key_signUp_Details',
};

export const HttpStatusCode = {
	OK: 200,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFound: 404,
	InternalServerError: 500,
	BadGateway: 502,
	ServiceUnavailable: 503,
	TooManyRequest: 429,
};

export const LINKS = {
	Dashboard: '/dashboard',
	Login: '/auth/login',
	ForgetPassword: '/auth/forget-password',
	CreateNewPassword: '/auth/password/new',
	Users: '/users',
	User: `/user`,
	Managers: '/managers',
	Transactions: '/transactions',
	Conversions: '/conversions',
	AutoConversions: '/auto-conversions',
	Network: '/network',
	DataNetwork: '/network/data',
	ConversionNetwork: '/network/conversion',
	DataPlan: '/data-plan',
	AirtimeNetwork: '/network/airtime',
	Coupons: '/coupons',
	Dispute: '/dispute',
	Referrals: '/referrals',
	AllReferrals: '/referrals/all',
	Referee: '/referee',
	Notifications: '/notifications',
	PushNotification: '/push-notification',
	Verification: '/verification',
	KycVerification: '/verification/kyc',
	Suspension: '/suspension',
	AuditLogs: '/audit-logs',
	Message: '/support-ticket/message',
	Messages: '/messages',
	DataTypes: '/data-types',
};

export const DRAWER_LINKS = {
	Dashboard: {
		name: 'Dashboard',
		path: LINKS.Dashboard,
	},
};

export const AMIN_ROLE = {
	OPERATIONS: 'OPERATIONS',
	CUSTOMER_SUPPORT: 'CUSTOMER_SUPPORT',
};

export const ENDPOINTS = {
	Login: '/staff/login',
	GetUser: '/staff/me',
	Staff: '/staff',
	Manager: '/manager',
	User: '/user',
	DataNetwork: '/data-networks',
	DataPlans: '/data-plans',
	AirtimeNetwork: '/airtime-networks',
	ConvertNetworks: '/convert-networks',
	ConvertAirtime: '/convert-airtime',
	Kyc: '/kyc',
	Transaction: '/transaction',
	Wallet: '/wallet',
	Coupon: '/coupon',
	Ticket: '/ticket',
};

export const FUND_WALLET_SERVICE = {
	CREDIT: 'CREDIT',
	DEBIT: 'DEBIT',
	REFUND: 'REFUND',
};

export const USERS_TAB = {
	All: 'All',
	Verified: 'Verified',
	Unverified: 'Unverified',
	Suspended: 'Suspended',
	Deleted: 'Deleted',
};
