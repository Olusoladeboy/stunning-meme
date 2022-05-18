import * as yup from 'yup';

const ValidationSchema = {
	OtpVerificationRequest: yup.object().shape({
		email: yup.string().email().required('Specify email'),
	}),
	login: yup.object().shape({
		email: yup.string().email().required('Specify email address'),
		password: yup.string().required('Specify password'),
	}),
	SelectEPin: yup.object().shape({
		epinType: yup.string().required('Select E-pin type'),
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
};

export default ValidationSchema;
