import React from 'react';
import AuthContainer from '../../components/layout/auth';
import ForgetPasswordForm from '../../components/forms/forget-password-form';

const ForgetPassword = () => {
	return (
		<AuthContainer>
			<ForgetPasswordForm />
		</AuthContainer>
	);
};

export default ForgetPassword;
