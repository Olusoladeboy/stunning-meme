import { ReactNode } from 'react';

export enum ThemeModeType {
	light = 'light',
	dark = 'dark',
}

export enum QueryKey {
	LoginUserDetails = '@Query:Login_user_details',
	AllManagers = '@Query:All_manager',
	AllUsers = '@Query:All_Users',
	GetSingleUser = '@Query:Get_single_user',
	DataNetwork = '@Query:Data_Network',
	ConvertNetwork = '@Query:Convert_Network',
	ConvertAirtime = '@Query:Convert_Airtime',
	AirtimeNetwork = '@Query:Airtime_Network',
	KycLimit = '@Query:Kyc_Limit',
	DataPlans = '@Query:Data_Plans',
	UserWallet = '@Query:User_Wallet',
	UserWalletTransaction = '@Query:User_Wallet_Transaction',
	UserTransactions = '@Query:User_Transactions',
	AllTransactions = '@Query:All_Transactions',
	RecentTransactions = '@Query:Recent_Transactions',
	AllStaff = '@Query:All_Staff',
	Statistics = '@Query:Statistics',
	Coupon = '@Query:Coupon',
	Tickets = '@Query:Tickets',
	Ticket = '@Query:Ticket',
}

export enum RegistrationStep {
	EMAIL_VERIFICATION = 'email_verification',
	BVN_VERIFICATION = 'bvn_verification',
	CREATE_ACCOUNT = 'create_account',
}

export type AppStore = {
	theme: ThemeModeType;
};

export type AxiosConfig = {
	url: string;
	baseUrl: string;
	method: any;
};

export type LoginData = {
	email?: string;
	phone?: string;
	password: string;
};

export type UserDetails = {
	suspensionDuration: { [key: string]: any };
	suspendWithdrawal: boolean;
	userType: string;
	hasPin: boolean;
	isActive: boolean;
	biometricLogin: boolean;
	verified: boolean;
	bvnVerified: boolean;
	suspended: boolean;
	suspensionReason: string;
	deleted: boolean;
	restricted: boolean;
	twoFactorAuth: boolean;
	isLoggedIn: boolean;
	role: string;
	suspendWalletTransactions: boolean;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	phone: string;
	createdAt: string;
	id: string;
	avatar: string;
	kycLevel: string;
};

export type LoginDetails = {
	email: string;
	password: string;
};

export type RouteTypes = {
	element: ReactNode;
	path: string;
};

export enum VerificationInput {
	email = 'email',
	phone = 'phone',
}

export type VerificationData = {
	data: {
		email?: VerificationInput.email;
		phone?: VerificationInput.phone;
	};
};

export enum TransactionStatus {
	PENDING = 'PENDING',
	FAILED = 'FAILED',
	SUCCESSFUL = 'SUCCESSFUL',
}

export enum UserStatus {
	Verified = 'verified',
	Unverified = 'unverified',
	Suspended = 'suspended',
	Deleted = 'deleted',
}

export enum BillTab {
	CablePayment = 'cable-payment',
	PowerBill = 'power-bill',
	Education = 'education',
	InternetSubscription = 'internet-subscription',
}

export enum EPins {
	Airtime = 'Airtime epin',
	InternetSubscription = 'Internet subscription',
	Cable = 'Cable',
	Power = 'Power',
	Education = 'Education',
}

export type AuthState = {
	isAuthenticated: boolean;
	user: UserDetails | null;
	token: string | null;
};

export enum SettingsTab {
	Profile = 'profile',
	Security = 'security',
	Notification = 'Notification',
	BankInformation = 'bank-information',
	ReferAndWin = 'Refer-and-win',
}

export enum ReferralHistory {
	PendingReferral = 'pending',
	AllReferral = 'all',
}

export interface ModalDetails {
	type?: 'success' | 'failed';
	title: string;
	message?: string;
	buttonText?: string;
	handlePress?: () => void | null;
	handleTryAgain?: () => void;
	handleClose?: () => void | null;
	isLoading?: boolean;
	children?: React.ReactNode;
	contentWidth?: string;
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

export enum NetworkPage {
	DATA_NETWORK = 'Data network',
	AIRTIME_NETWORK = 'Airtime network',
	CONVERSION_NETWORK = 'Conversion network',
}

export enum NetworkStatus {
	ENABLE = 'enable',
	DISABLE = 'disable',
}

export enum API_ENDPOINTS {
	Login = '/staff/login',
	GetUser = '/staff/me',
	Staff = '/staff',
	Manager = '/manager',
	User = '/user',
	DataNetwork = '/data-networks',
	DataPlans = '/data-plans',
	AirtimeNetwork = '/airtime-networks',
	ConvertNetworks = '/convert-networks',
	ConvertAirtime = '/convert-airtime',
	Kyc = '/kyc',
	Transaction = '/transaction',
	Wallet = '/wallet',
	Coupon = '/coupon',
	Ticket = '/ticket',
}

export type ManagerDetailsData = {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	avatar?: string;
};

export type NetworkData = {
	name?: string;
	rate?: string;
	number?: string;
	ussd?: string;
	isActive?: boolean;
};

export type KycData = {
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
	isActive?: boolean;
	id?: string;
};

export enum DataPlanType {
	USSD = 'USSD',
	SMS = 'SMS',
	MANUAL = 'MANUAL',
	KETTLESUB = 'KETTLESUB',
}

export interface DataType {
	isActive?: boolean;
	id?: string;
	name?: string;
	createdAt?: string;
	no_of_plans?: number;
	network?: string;
}

export type SuspendUser = {
	suspended: boolean;
	suspensionDurationInDays?: string;
	suspensionReason?: string;
};

export type Statistics = {
	total_transactions: number;
	total_users: number;
	total_conversions: number;
	total_verified_users: number;
	total_unverified_users: number;
	total_deleted_users: number;
	total_suspended_users: number;
	total_airtime_converted: number;
	total_data_sold: number;
	total_amount_withdrawn: number;
	total_wallet_transfer: number;
	total_wallet_transaction: {
		credit: number;
		debit: number;
	};
	total_wallet_balance: number;
};

export interface Amount {
	$numberDecimal: string;
}

export interface Coupon {
	code?: string;
	name?: string;
	type?: string;
	expiresIn?: string;
	gift?: Amount | string;
	createdBy?: UserDetails;
	createdAt?: string;
	id?: string;
	status?: string;
}

export enum TransactionServices {
	CardTopUp = 'CARD TOP UP',
	DataSubscription = 'DATA SUBSCRIPTION',
	Education = 'EDUCATION',
	Electricity = 'ELECTRICITY',
	CableSubscription = 'CABLE',
	AirtimeConversion = 'AIRTIME CONVERSION',
	WalletTopup = 'WALLET TOP UP',
	Epin = 'EPIN',
	AirtimeTop = 'Airtime Top Up',
	WITHDRAWAL = 'WITHDRAWAL',
}

export enum RelatedTransactionTypes {
	BillPayment = 'BillPayment',
	Airtime = 'Airtime',
	DataSubscription = 'DataSubscription',
	AirtimeConvert = 'AirtimeConvert',
}

export enum CouponStatus {
	UNVERIFIED = 'UNVERIFIED',
	VERIFIED = 'VERIFIED',
	CANCELLED = 'CANCELLED',
	EXPIRED = 'EXPIRED',
}

export interface UpdateCouponStatus {
	status:
		| CouponStatus.VERIFIED
		| CouponStatus.UNVERIFIED
		| CouponStatus.CANCELLED
		| CouponStatus.EXPIRED;
}

export enum CouponType {
	PERCENT = 'PERCENT',
	AMOUNT = 'AMOUNT',
}

export enum Priority {
	HIGH = 'HIGH',
	MEDIUM = 'MEDIUM',
	LOW = 'LOW',
}

export enum TicketStatus {
	OPENED = 'OPENED',
	CLOSED = 'CLOSED',
}

export enum TicketType {
	COMPLAINT = 'COMPLAINT',
	DISPUTE = 'DISPUTE',
}

export interface RelatedTransaction {
	status: TransactionStatus;
	name: string;
	amount: string;
	reference: string;
	user: string;
	transaction: string;
	type: TransactionServices;
	card_number?: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface TicketReply {
	reply_type: TicketReplyType;
	id?: string;
	repliedBy?: string;
	reply: string;
}

export interface Ticket {
	type: TicketType;
	status: TicketStatus;
	priority: Priority;
	related_transaction_type?: RelatedTransactionTypes;
	subject: String;
	related_transaction?: RelatedTransaction | null;
	message: string;
	code: string;
	user: string;
	replies: TicketReply[];
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface CreateTicket {
	priority: Priority.HIGH | Priority.LOW | Priority.LOW | string;
	subject: string;
	related_transaction?: string;
	related_transaction_type?: string;
	message: string;
	type: TicketType.COMPLAINT | TicketType.DISPUTE | string;
}

export interface CloseTicket {
	status: string;
}

export enum TicketReplyType {
	Staff = 'Staff',
	User = 'User',
}

export type User = {
	id: string;
	suspensionDuration: { [key: string]: any };
	userType: string;
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
	kycLevel: number;
	createdAt: Date;
	username: string;
	phone: string;
	hasPin: boolean;
	manager: string | { [key: string]: any };
	defaultBank: string;
	photoUrl: string | null;
	code: string;
};

export interface PinData {
	network?: string;
	amount?: number;
	plan?: string;
	service_type?: string;
	product_code?: string;
	price?: number;
	monthsPaidFor?: number;
	numberOfPins?: number;
}

export interface EducationPin {
	serialNumber: string;
	pin: string;
}

export interface ElectricityToken {
	token: string;
	unit: number;
	amount: string;
	transId: string;
}

export interface Transaction {
	id: string;
	status:
		| TransactionStatus.FAILED
		| TransactionStatus.PENDING
		| TransactionStatus.SUCCESSFUL;
	plan: string;
	service: string;
	number: string;
	createdBy: string;
	reference: string;
	user: User;
	amount: string | Amount;
	balanceBefore: string;
	balanceAfter: string;
	name: string;
	type: string;
	createdAt: string;
	pin_data?: PinData;
	pin?: string;
	pins?: EducationPin[];
	transaction: {
		id: string;
		amount: Amount;
		discount_code?: string | null;
		balanceBefore: Amount;
		balanceAfter: Amount;
		type: string;
		service: string;
		createdBy: string;
		user: string;
		reference: string;
		createdAt: string;
		updatedAt: string;
	};
	electricity_token?: ElectricityToken;
}
