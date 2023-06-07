import * as yup from 'yup';
import { PHONE_REX } from '../helpers/reg-expression';

const ValidationSchema = {
	OtpVerificationRequest: yup.object().shape({
		email: yup.string().email().required('Specify email'),
	}),
	Login: yup.object().shape({
		email: yup.string().email().required('Specify email address'),
		password: yup.string().required('Specify password'),
	}),
	SelectEPin: yup.object().shape({
		epinType: yup.string().required('Select E-pin type'),
	}),
	ManagerDetails: yup.object().shape({
		firstname: yup.string().required('Specify manager first name'),
		lastname: yup.string().required('Specify manager last name'),
		email: yup.string().email().required('Specify manager email'),
		phone: yup.string().matches(PHONE_REX, 'Invalid phone number'),
	}),
	EPin: yup.object().shape({
		epinType: yup
			.string()
			.notOneOf(['Select E-pin type'], 'Select E-pin type')
			.required('Select E-pin type'),
		code: yup
			.number()
			.min(6, 'Code must be 6 digits')
			.required('Specify E-pin code'),
	}),
	DataNetwork: yup.object().shape({
		name: yup.string().required('Specify name'),
	}),
	AirtimeNetwork: yup.object().shape({
		name: yup.string().required('Specify name'),
		rate: yup.string().required('Specify rate'),
		ussd: yup.string().required('Specify ussd'),
	}),
	ConvertNetwork: yup.object().shape({
		name: yup.string().required('Specify name'),
		rate: yup.string().required('Specify rate'),
		number: yup
			.string()
			.required('Specify phone number')
			.matches(PHONE_REX, 'Invalid phone number'),
	}),
	AutoConvertNetwork: yup.object().shape({
		name: yup.string().required('Specify name'),
		rate: yup.string().required('Specify rate'),
	}),
	KycLimit: yup.object().shape({
		dailyLimit: yup.number().required('Specify daily limit'),
		weeklyLimit: yup.number().required('Specify weekly limit'),
		monthlyLimit: yup.number().required('Specify mothly limit'),
		perTransactionLimit: yup.number().required('Specify transaction per limit'),
	}),
	Coupon: yup.object().shape({
		code: yup.string().required('Specify coupon code'),
		type: yup
			.string()
			.notOneOf(['Select coupon type'], 'Select coupon type')
			.required('Select coupon type'),
		expiresIn: yup.date().required('Specify expire date'),
		gift: yup
			.number()
			.positive('Gift must be positive number')
			.required('Specify gift in number'),
	}),
	EditCoupon: yup.object().shape({
		gift: yup
			.number()
			.positive('Gift must be positive number')
			.required('Specify gift in number'),
		type: yup
			.string()
			.notOneOf(['Select coupon type'], 'Select coupon type')
			.required('Select coupon type'),
	}),
};

export default ValidationSchema;
