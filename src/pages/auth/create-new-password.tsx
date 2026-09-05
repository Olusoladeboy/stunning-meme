import React from 'react';
import { AuthLayout, CreatePasswordForm } from 'components';
import { usePageTitle } from 'hooks';

const CreateNewPassword = () => {
	usePageTitle('Create new password');
	return (
		<AuthLayout>
			<CreatePasswordForm />
		</AuthLayout>
	);
};

export default CreateNewPassword;
