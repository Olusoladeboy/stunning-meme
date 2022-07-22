import { ReactNode } from 'react';

export enum ThemeModeType {
	light = 'light',
	dark = 'dark',
}

export enum StorageKeys {
	themeMode = '@Storage_theme_mode',
	UserToken = '@Storage:user_token',
	UserDetails = '@Storage:user_details',
	Application = '@Storage:key_application',
	SignUpDetails = '@Storage:key_signUp_Details',
}

export enum QueryKeyTypes {
	LoginUserDetails = '@Query:Login_user_details',
	AllManagers = '@Query:All_manager',
	AllUsers = '@Query:All_Users',
	GetSingleUser = '@Query:Get_single_user',
	DataNetwork = '@Query:Data_Network',
	AirtimeNetwork = '@Query:Airtime_Network',
	KycLimit = '@Query:Kyc_Limit',
	DataPlans = '@Query:Data_Plans',
}

export enum RegistrationStepTypes {
	EMAIL_VERIFICATION = 'email_verification',
	BVN_VERIFICATION = 'bvn_verification',
	CREATE_ACCOUNT = 'create_account',
}

export type AppStore = {
	theme: ThemeModeType;
};

export type AxiosConfigTypes = {
	url: string;
	baseUrl: string;
	method: any;
};

export type LoginDataTypes = {
	email?: string;
	phone?: string;
	password: string;
};

export type UserDetailsType = {
	suspensionDuration: { [key: string]: any };
	userType: string;
	hasPin: boolean;
	biometricLogin: boolean;
	verified: boolean;
	bvnVerified: boolean;
	suspended: boolean;
	deleted: boolean;
	restricted: boolean;
	twoFactorAuth: boolean;
	isLoggedIn: boolean;
	suspendWalletTransactions: boolean;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	phone: string;
	createdAt: string;
	id: string;
};

export type LoginDetailsType = {
	email: string;
	password: string;
};

export type RouteTypes = {
	element: ReactNode;
	path: string;
};

export enum VerificationInputTypes {
	email = 'email',
	phone = 'phone',
}

export type VerificationDataTypes = {
	data: {
		email?: VerificationInputTypes.email;
		phone?: VerificationInputTypes.phone;
	};
};

export enum HttpStatusCodeTypes {
	OK = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500,
	BadGateway = 502,
	ServiceUnavailable = 503,
}

export enum TransactionStatusTypes {
	PENDING = 'pending',
	FAILDED = 'failed',
	SUCCESSFUL = 'successful',
}

export enum UserStatusTypes {
	Verified = 'verified',
	Unverified = 'unverified',
	Suspended = 'suspended',
	Deleted = 'deleted',
}

export enum BillTabTypes {
	CablePayment = 'cable-payment',
	PowerBill = 'power-bill',
	Education = 'education',
	InternetSubscription = 'internet-subscription',
}

export enum EPinsTypes {
	Airtime = 'Airtime epin',
	InternetSubscription = 'Internet subscription',
	Cable = 'Cable',
	Power = 'Power',
	Education = 'Education',
}

export type AuthStateTypes = {
	isAuthenticated: boolean;
	user: { [key: string]: any } | null;
	token: string | null;
};

export enum SettingsTabTypes {
	Profile = 'profile',
	Security = 'security',
	Notification = 'Notification',
	BankInformation = 'bank-information',
	ReferAndWin = 'Refer-and-win',
}

export enum ReferralHistoryTypes {
	PendingReferral = 'pending',
	AllReferral = 'all',
}

export enum UserNavList {
	Profile = 'profile',
	Status = 'status',
	Transaction = 'transaction',
	WalletSummary = 'wallet-summary',
	Manager = 'manager',
}

export enum ManagerTypes {
	Manager = 'Manager',
	Admin = 'Admin',
}

export enum NetworkPageTypes {
	DATA_NETWORK = 'Data network',
	AIRTIME_NETWORK = 'Airtime network',
}

export enum NetworkStatusTypes {
	ENABLE = 'enable',
	DISABLE = 'disable',
}

export enum API_ENDPOINTS {
	Login = '/staff/login',
	GetUser = '/staff/me',
	Manager = '/manager',
	User = '/user',
	DataNetwork = '/data-networks',
	DataPlans = '/data-plans',
	AirtimeNetwork = '/airtime-networks',
	Kyc = '/kyc',
	Transaction = '/transaction',
}

export type ManagerDetailsDataTypes = {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	avatar?: string;
};

export type NetworkDataTypes = {
	name?: string;
	rate?: string;
	number?: string;
	ussd?: string;
	isActive?: boolean;
};

export type KycDataTypes = {
	level?: number;
	dailyLimit: number;
	weeklyLimit: number;
	monthlyLimit: number;
	perTransactionLimit: number;
};

export type DataPlan = {
	name?: string;
	network?: string;
	amount: string | { $numberDecimal: string };
	type: string;
	code: string;
	shortcode?: string;
	shortcode_sms?: string;
};

export enum DataPlanType {
	USSD = 'USSD',
	SMS = 'SMS',
	MANUAL = 'MANUAL',
	KETTLESUB = 'KETTLESUB',
}
