import appLogo from '../../assets/icons/app-logo.png';
export const PRIMARY_COLOR = '#28536B';
export const LIGHT_PRIMARY_COLOR = '#FDEDD7';
export const SECOUNDARY_COLOR = '#F38D04';
export const TRANSITION = 'all 0.3s';
export const DRAWER_WIDTH = '280px';
export const MIN_DRAWER_WIDTH = '80px';
export const PENDING_COLOR = '#30AF9F';
export const DANGER_COLOR = '#E84E51';
export const SUCCESS_COLOR = '#389651';
export const SEMI_GREEN_COLOR = '#2FAF9E';
export const LIGHT_GRAY = '#DCE3E7';
export const HEADER_HEIGHT = '70px';
export const DARK_BACKGROUND_COLOR = '#09171f';
export const BOX_SHADOW = `0px 0px 8px rgba(0, 0, 0, 0.1)`;
export const MAX_RECORDS = 20;

export const REFERRAL_BONUS = 'MININUM_BONUS_RATE';

export const PRIVILEGE_MESSAGE =
	'Unable to perform this operation, you do not have such privilege';

export const QueryKeys = {
	LoginUserDetails: '@Query:Login_user_details',
	Managers: '@Query:All_manager',
	Referrals: '@Query:Referrals',
	Referees: '@Query:Referees',
	Settings: '@Query:Settings',
	Notifications: '@Query:Notifications',
	RecentConvertAirtime: '@Query:RecentConvertAirtime',
	Users: '@Query:All_Users',
	User: '@Query:Get_single_user',
	SuspendUser: '@Query:Suspend_user',
	DataNetwork: '@Query:Data_Network',
	DataSubscription: '@Query:Data_Subscription',
	ConvertNetwork: '@Query:Convert_Network',
	AutoConvertNetwork: '@Query:Auto_Convert_Network',
	ConvertAirtime: '@Query:Convert_Airtime',
	AutoConvertAirtime: '@Query:AutoConvert_Airtime',
	AirtimeNetwork: '@Query:Airtime_Network',
	KycLimit: '@Query:Kyc_Limit',
	DataPlans: '@Query:Data_Plans',
	DataTypes: '@Query:DataTypes',
	UserWallet: '@Query:User_Wallet',
	UserWalletTransaction: '@Query:User_Wallet_Transaction',
	UserTransactions: '@Query:User_Transactions',
	Transactions: '@Query:All_Transactions',
	AuditLogs: '@Query:Audit_logs',
	RecentTransactions: '@Query:Recent_Transactions',
	Staffs: '@Query:All_Staffs',
	Statistics: '@Query:Statistics',
	Coupon: '@Query:Coupon',
	Tickets: '@Query:Tickets',
	Ticket: '@Query:Ticket',
	Me: '@Query:Me',
	Verification: '@Query:Verification',
	BvnVerification: '@Query:BvnVerification',
	NiNVerification: '@Query:NiNVerification',
	ApiLogs: '@Query:ApiLogs',
	UserTransactionStatistics: '@Query:UserTransactionStatistics',
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
	ChangePassword: '/auth/password/change',
	Users: '/users',
	User: `/user`,
	Managers: '/managers',
	Transactions: '/transactions',
	AllTransactions: '/transactions/all',
	Conversions: '/conversions',
	AllConversions: '/conversions/all',
	AutoConversions: '/auto-conversions',
	Network: '/network',
	DataNetwork: '/data-network',
	ConversionNetwork: '/conversions/network',
	AutoConversionNetwork: '/auto-conversions/network',
	DataPlan: '/data-network/plans',
	DataTypes: '/data-network/types',
	AirtimeNetwork: '/airtime-network',
	Coupons: '/coupons',
	Dispute: '/dispute',
	Referrals: '/referrals',
	ReferralsBonus: '/referrals/bonus',
	Referees: (email: string) => `/referrals/${email}/referees`,
	Referee: '/referee',
	Notifications: '/notifications',
	CreateNotification: '/notifications/create',
	PushNotification: '/push-notification',
	Verification: '/verification',
	NinVerification: '/nin-verification',
	BvnVerification: '/bvn-verification',
	KycVerification: '/verification/kyc',
	Suspension: '/suspension',
	AuditLogs: '/audit-logs',
	ApiLogs: '/api-logs',
	Message: '/support-ticket/message',
	Messages: '/messages',
	Statistics: '/statistics',
};

export const DRAWER_LINKS = {
	Dashboard: {
		name: 'Dashboard',
		path: LINKS.Dashboard,
	},
};

export const ADMIN_ROLE = {
	OPERATIONS: 'OPERATIONS',
	CUSTOMER_SUPPORT: 'CUSTOMER_SUPPORT',
	SUPER_ADMIN: 'SUPER_ADMIN',
	ADMIN: 'ADMIN',
};

export const ENDPOINTS = {
	Login: '/staff/login',
	Referrals: '/referrals',
	GetUser: '/staff/me',
	Staff: '/staff',
	Settings: '/setting',
	Manager: '/manager',
	Bill: '/bill',
	User: '/user',
	DataNetwork: '/data-networks',
	DataSubscription: '/data-subscription',
	DataPlans: '/data-plans',
	DataTypes: '/data-types',
	AirtimeNetwork: '/airtime-networks',
	ConvertNetworks: '/convert-networks',
	ConvertAirtime: '/convert-airtime',
	AutoConvertAirtime: '/auto-convert-airtime',
	Kyc: '/kyc',
	Verification: '/verifications',
	Transaction: '/transaction',
	Wallet: '/wallet',
	Coupon: '/coupon',
	Ticket: '/ticket',
	Notification: '/notification',
	AuditLogs: '/audit-logs',
	ApiLogs: '/api-logs',
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
	Deactivated: 'Deactivated',
};

export const TRANSACTIONS_TAB = {
	ALL: 'ALL',
	PENDING: 'PENDING',
	FAILED: 'FAILED',
	SUCCESSFUL: 'SUCCESSFUL',
	APPROVED: 'APPROVED',
	DECLINED: 'DECLINED',
};

export const CONVERSIONS_TAB = {
	ALL: 'ALL',
	PENDING: 'PENDING',
	APPROVED: 'APPROVED',
	DECLINED: 'DECLINED',
};

export const STATUS = {
	APPROVED: 'APPROVED',
	DECLINED: 'DECLINED',
};

export const STATISTIC_TAB = {
	TODAY: 'TODAY',
	LAST_7_DAY: 'LAST 7 DAYS',
	LAST_30_DAYS: 'LAST 30 DAYS',
	ALL_TIME: 'ALL TIME',
};

export const LOG_TAB = {
	Audit: 'Audit',
	Api: 'Api',
};

export const DATA_SOURCE = {
	SIMSERVER: 'SIMSERVER',
	AIRTIMEFLIP_DATASERVER: 'AIRTIMEFLIP_DATASERVER',
	GLO_SERVER: 'GLO_SERVER',
	TBCH: 'TBCH',
	AYINLAKCONNECT: 'AYINLAKCONNECT',
	OGDAMS: 'OGDAMS',
};

export const NOTIFICATION_TYPE = {
	TOAST: 'TOAST',
	PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
	IN_APP: 'IN_APP',
	EMAIL_NOTIFICATION: 'EMAIL_NOTIFICATION',
};

export const DISPATCH_USER = {
	ALL: 'ALL',
	SELECTED: 'SELECTED',
};

export const DEVICE = {
	IOS: 'IOS',
	ANDROID: 'ANDROID',
	WINDOW: 'WINDOW',
	ALL: 'ALL',
};

export const SERVICES = {
	WITHDRAWAL: 'WITHDRAWAL',
	DATA_SUBSCRIPTION: 'DATA SUBSCRIPTION',
	AIRTIME_TOP_UP: 'AIRTIME TOP UP',
	AIRTIME_CONVERSION: 'AIRTIME CONVERSION',
	CARD_TOP_UP: 'CARD TOP UP',
	CABLE: 'CABLE',
	INTERNET: 'INTERNET',
	EDUCATION: 'EDUCATION',
	ELECTRICITY: 'ELECTRICITY',
	EPIN: 'EPIN',
	REVERSAL: 'REVERSAL',
	WALLET_TRANSFER: 'WALLET TRANSFER',
};

export const VERIFICATION_STATUS = {
	FAILED: 'FAILED',
	SUCCESSFUL: 'SUCCESSFUL',
	PENDING: 'PENDING',
};

export const TRANSACTION_SERVICE = {
	WITHDRAWAL: 'WITHDRAWAL',
	DATA_SUBSCRIPTION: 'DATA SUBSCRIPTION',
	AIRTIME_TOP_UP: 'AIRTIME TOP UP',
	AIRTIME_CONVERSION: 'AIRTIME CONVERSION',
	CARD_TOP_UP: 'CARD TOP UP',
	CABLE: 'CABLE',
	INTERNET: 'INTERNET',
	EDUCATION: 'EDUCATION',
	ELECTRICITY: 'ELECTRICITY',
	EPIN: 'EPIN',
	WALLET_TRANSFER: 'WALLET TRANSFER',
};

export const TOOL_BAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	['link'],
	['blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
	[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction
	[{ font: [] }],
	[{ align: [] }],

	['clean'], // remove formatting button
];

export const SEO = {
	meta: {
		title: 'Airtimeflip Admin',
		titleTemplate: '%s',
		description:
			'AirtimeFlip is your no 1 airtime to cash converter in Nigeria. We convert your over recharged airtime to cash. We also provide other services which includes Airtime and data purchase, utility and educational bill payments, cable tv subscriptions and lots more',
		siteUrl: 'https://airtimeflip.com',
		image: appLogo,
		iconimage: appLogo,
	},
	ga: 'UA-XXXXXXXXX-X',
};
