import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Storage } from '../helpers';
import { StorageKeys } from '../constant';

interface Props {
	children: ReactElement;
}

const AuthGuard = ({ children }: Props) => {
	const token = Storage.getItem(StorageKeys.UserToken);

	if (token) {
		return children;
	}

	return <Navigate to={'/auth/login'} replace />;
};

export default AuthGuard;
