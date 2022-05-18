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

export type LoginTypes = {
	email?: string;
	phone?: string;
	password: string;
};

export type UserDetailsType = {
	[key: string]: any;
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
