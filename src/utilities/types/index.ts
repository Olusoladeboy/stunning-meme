import { ReactNode } from 'react';

export enum ThemeModeType {
	light = 'light',
	dark = 'dark',
}

export enum QueryKey {
	LoginUser = '@Query:Login_user_details',
	AllManagers = '@Query:All_manager',
	AllUsers = '@Query:All_Users',
	GetSingleUser = '@Query:Get_single_user',
	DataNetwork = '@Query:Data_Network',
	ConvertNetwork = '@Query:Convert_Network',
	AutoConvertNetwork = '@Query:Auto_Convert_Network',
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
	APPROVED = 'APPROVED',
	DECLINED = 'DECLINED',
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
	user: User | null;
	token: string | null;
	canViewStatistics: boolean;
	canCreateOrUpdateRecord: boolean;
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

export interface IModalAlert {
	type?: 'success' | 'error' | 'info';
	title?: string;
	message?: string;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	onClickPrimaryButton?: () => void;
	onClickSecondaryButton?: () => void;
	children?: ReactNode;
	isLoading?: boolean;
	closeModal?: () => void;
}

export interface IModal {
	type?: 'success' | 'error' | 'info' | 'pending' | 'verify';
	description?: string;
	title?: string;
	message?: string;
	buttonText?: string;
	handlePrimaryButton?: () => void | null;
	hasSecondaryButton?: boolean;
	handleSecondaryButton?: () => void;
	secondaryButtonText?: string;
	handleContactUs?: () => void;
	closeModal?: () => void | null;
	isLoading?: boolean;
	children?: React.ReactNode;
	isContactSupport?: boolean;
	hasCloseButton?: boolean;
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
	AUTO_CONVERSION_NETWORK = 'Auto conversion network',
}

export interface AirtimeConversion extends Transaction {
	amount: Amount | string;
	return_amount: Amount | string;
	phone_number: string;
	network: NetworkData;
	user: User;
	reference: string;
	sentTo: string;

	id: string;
	declinedBy: string | User;
	declinedDate: Date;
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
	AutoConvertNetwork = '/auto-convert-networks',
	ConvertAirtime = '/convert-airtime',
	Kyc = '/kyc',
	Transaction = '/transaction',
	Notification = '/notification',
	Wallet = '/wallet',
	Coupon = '/coupon',
	Ticket = '/ticket',
}

export interface ManagerDetailsData extends User {
	firstname: string;
	lastname: string;
	email: string;
	phone?: string;
}

export interface IBill {
	service_type?: string;
	smartcard_number?: string;
	card_number?: string;

	product_code?: string;
	price?: number | string;
	monthsPaidFor?: number | string;
	numberOfPins?: string | number;
	discount_code?: string;
	amount?: string | number;
	meter_number?: string;
	exam_bundle?: string;
	internetPlan?: string;
}

export interface AvailablePricingOption {
	monthsPaidFor: number;
	price: number;
	invoicePeriod: number;
}

export interface Bundle {
	amount: number;
	available: number;
	description: string;
	availablePricingOptions: AvailablePricingOption[];
	code: string;
	name: string;
}

export interface Provider {
	service_type: string;
	shortname: string;
	billerid: number;
	productid: number;
	name: string;
	type: string;
	description?: string;
	id?: string | number;
	narration: string;
	short_name: string;
	image: string;
}

export type NetworkData = {
	name?: string;
	id?: string;
	rate?: string;
	number?: string;
	ussd?: string;
	isActive?: boolean;
	createdAt?: Date;
	no_of_dataTypes?: string;
	no_of_plans?: string;
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
	amount?: string | Amount | number;
	code?: string;
	isActive?: boolean;
	id?: string;
	network?: NetworkData | string;
	merchant_amount?: Amount | string | number;
	data_unit?: string;
	data_source?: string;
	dataType?: DataType | string;
	level?: string | number;
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
	network?: NetworkData | string;
}

export type SuspendUser = {
	suspended: boolean;
	suspensionDurationInDays?: string;
	suspensionReason?: string;
};

export type Statistics = {
	total_transactions: number;
	total_pending_transactions: number;
	total_successful_transactions: number;
	total_failed_transactions: number;
	total_users: number;
	total_conversions: number;
	total_verified_users: number;
	total_unverified_users: number;
	total_deactivated_users: number;
	total_deleted_users: number;
	total_suspended_users: number;
	total_airtime_converted: number;
	total_auto_airtime_converted: number;
	total_auto_airtime_conversions: number;
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

export interface IVerification {
	status: string;
	user: User;
	request: {
		type: string;
		firstname: string;
		lastname: string;
		phone: string;
		payload: string;
		dob?: string;
	};
	level: number;
	payload: string;
	type: string;
	channel: string;
	code: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface Coupon {
	code?: string;
	name?: string;
	type?: string;
	expiresIn?: string;
	gift?: Amount | string;
	createdBy?: User;
	createdAt?: string;
	id?: string;
	status?: string;
	couponUserType?: string;
	user?: string;
	usage?: string;
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
	related_transaction?: RelatedTransaction | string | null;
	message: string;
	code: string;
	user: string | User;
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

export interface ResolveTicket {
	code: string;
	strictCheck: boolean;
}

export enum TicketReplyType {
	Staff = 'Staff',
	User = 'User',
}

export type User = {
	suspensionDuration?: { [key: string]: any };
	suspendWithdrawal?: boolean;
	userType?: string;
	hasPin?: boolean;
	isActive?: boolean;
	biometricLogin?: boolean;
	verified?: boolean;
	bvnVerified?: boolean;
	suspended?: boolean;
	suspensionReason?: string;
	deleted?: boolean;
	restricted?: boolean;
	twoFactorAuth?: boolean;
	isLoggedIn?: boolean;
	role?: string;
	suspendWalletTransactions?: boolean;
	firstname?: string;
	lastname?: string;
	email?: string;
	username?: string;
	phone?: string;
	createdAt?: string;
	id?: string;
	avatar?: string;
	kycLevel?: string;
	manager?: User;
	defaultBank?: string;
	photoUrl?: string | null;
	no_of_referees?: number;
	defaultPasswordChanged?: boolean;
	currentIp?: string;
	users?: number;
};

export interface PinData {
	network?: INetwork | string;
	amount?: number;
	plan?: string;
	service_type?: string;
	product_code?: string;
	price?: number;
	monthsPaidFor?: number;
	numberOfPins?: number;
	name?: string;
}

export interface EducationPin {
	serialNumber: string;
	pin: string;
}

export interface IPin {
	pin: string;
	expiresOn: string;
	instructions: any;
	serialNumber: string;
}

export interface ElectricityToken {
	token: string;
	unit: number;
	amount: string;
	transId: string;
}

export interface INetwork {
	name?: string;
	id?: string;
	rate?: string;
	number?: string;
	ussd?: string;
	isActive?: boolean;
	createdAt?: Date;
	no_of_dataTypes?: string;
	no_of_plans?: string;
}

export interface DataType {
	isActive?: boolean;
	id?: string;
	name?: string;
	createdAt?: string;
	no_of_plans?: number;
	network?: INetwork | string;
}

export type IDataPlan = {
	name?: string;
	amount?: string | Amount;
	code?: string;
	isActive?: boolean;
	id?: string;
	type?: string;
	network?: INetwork | string;
	merchant_amount?: Amount | string;
	data_unit?: string;
	data_source?: string;
	dataType?: DataType | string;
};

export interface INestedTransaction {
	id: string;
	amount: Amount;
	discount_code?: string | Coupon;
	balanceBefore: Amount;
	balanceAfter: Amount;
	type: string;
	service: string;
	createdBy: string;
	user: string;
	reference: string;
	createdAt: string;
	updatedAt: string;
}

export interface IGroupTransaction {
	id: string;
	amount: Amount;
	status: string;
	returnAmount: Amount;
	service: string;
	sentTo: string;
	phone_number: string;
	sessionId: string;
	createdBy: string;
	user: string;
	reference: string;
	network: string;
	networkResponse: string;
	simBalanceLog: {
		before: string;
		after: string;
	};
	transaction: string;
	createdAt: string;
	updatedAt: string;
}

export interface IMetaData {
	count: number;
	limit: number;
	page: number;
	skip: number;
	sort: number;
	total: number;
}

export interface IGroupAutoTransaction {
	id: string;
	count: number;
	phone_number: string;
	sentTo: string;
	network: NetworkData;
	user: {
		firstname: string;
		lastname: string;
		username: string;
		phone: string;
		email: string;
	};
	totalAmount: Amount;
	totalReturnAmount: Amount;
	transactions: IGroupTransaction[];
	createdAt: string;
}

export interface Transaction {
	id: string;
	status:
		| TransactionStatus.FAILED
		| TransactionStatus.PENDING
		| TransactionStatus.SUCCESSFUL;
	type: string;
	plan: string | IDataPlan;
	dataType?: string | DataType;
	data_unit: {
		$numberDecimal: string;
	};
	service: string;
	number: string;
	noOfRetries: string;
	createdBy: string;
	phone_number?: string;
	card_number?: string;
	reference: string;
	network?: string | NetworkData;
	summary?: string;
	user: User;
	userTo?: User;
	userFrom?: User;
	transactionTo?: INestedTransaction;
	transactionFrom?: INestedTransaction;
	transactions?: IGroupTransaction[];
	amount: string | Amount;
	totalAmount?: string | Amount;
	totalReturnAmount: string | Amount;
	balanceBefore?: string | Amount;
	balanceAfter?: string | Amount;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	pin_data?: PinData;
	pin?: string;
	pins?: IPin[];
	transaction: INestedTransaction;
	electricity_token?: ElectricityToken;
	withdrawalChannel?: string;
	accountNumber?: string;
	paymentGateway?: string;
	return_amount: Amount | string;
	sentTo: string | User;
	declinedBy: string | User;
	declinedDate: Date;
	bankCode?: string;
	withdrawalTransactionCharge?: string;
	externalReference?: string;
}

export interface IReferral {
	bonus: string;
	user: User;
	referredBy: User;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface Metadata {
	total: number;
	limit: number;
	count: number;
	skip: number;
	page: number;
	sort: string;
}

export interface DataResponse<T> {
	success: boolean;
	message: string;
	metadata?: Metadata;
	payload: T;
}

export interface Settings {
	name?: string;
	value?: string;
	createdAt?: string;
	updatedAt?: string;
	id?: string;
}

export interface Notification {
	subject?: string;
	message?: string;
	imageUrl?: string;
	type?: string;
	// device?: string; - changed to devices in backend
	devices?: string;
	click_action?: string;
	dispatchUserType?: string;
	users?: string[];
	code?: string;
	createdAt?: string;
	updatedAt?: string;
	id?: string;
}

export interface AuditLog {
	staff: string | User;
	module: string;
	action: string;
	details: string;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}

export interface IApiLog {
	reference: string;
	user: string | User;
	api_log: {
		payment: boolean;
		paymentRemark: string;
		gateway: {
			transactionReference: string;
			paymentReference: string;
			amountPaid: string;
			totalPayable: string;
			settlementAmount: string;
			paidOn: string;
			paymentStatus: string;
			paymentDescription: string;
			currency: string;
			paymentMethod: string;
			product: {
				type: string;
				reference: string;
			};
			cardDetails: {
				cardType: string;
				last4: string;
				expMonth: string;
				expYear: string;
				bin: string;
				bankCode: string;
				bankName: string;
				reusable: boolean;
				countryCode: any;
				cardToken: string;
				supportsTokenization: boolean;
				maskedPan: string;
			};
			accountDetails: any;
			accountPayments: any[];
			customer: {
				email: string;
				name: string;
			};
			metaData: {};
		};
	};
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface IPurchasedBill {
	name: string;
	amount: string;
	reference: string;
	card_number?: string;
	user: string | User;
	transaction: string;
	type: string;
	service: string;
	electricity_token: {
		token: string;
		unit: number;
		transId: string;
		amount: string;
	};
	createdAt: string;
	updatedAt: string;
	id: string;
	status: string;
	pins: IPin[];
}

export interface IWithdrawal {
	amount: string;
	status: string;
	service: string;
	type: string;
	bankCode: string;
	accountNumber: string;
	user: string;
	reference: string;
	transaction: string;
	withdrawalChannel: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface IEpin {
	id: string;
	status: string;
	used: boolean;
	service: string;
	pin_data: {
		amount: number;
		network: NetworkData;
	};
	amount: Amount;
	transaction: string;
	user: string;
	pin: string;
	createdAt: string;
	updatedAt: string;
}

export interface IFunding {
	amount: string;
	status: string;
	service: string;
	paymentGateway: string;
	reference: string;
	externalReference: string;
	user: User | string;
	transaction: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface ITransfer {
	amount: string;
	status: string;
	service: string;
	userFrom: User | string;
	userTo: User | string;
	reference: string;
	transactionFrom: Transaction | string;
	transactionTo: Transaction | string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export type AuditFilter = {
	user: string;
	action: string;
	date: string;
};
