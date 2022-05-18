import React from 'react';
import AuthContainer from '../../components/layout/auth';
import CreateNewPasswordForm from '../../components/forms/create-new-password-form';

const CreateNewPassword = () => {
	return (
		<AuthContainer>
			<CreateNewPasswordForm />
		</AuthContainer>
	);
};

export default CreateNewPassword;
