import React from 'react';
import { Navigate } from 'react-router-dom';
import { StorageKeys } from '../types';
import Storage from '../storage';

type Props = {
	children: any;
};

const PrivateRoute = ({ children }: Props) => {
	const token = Storage.getItem(StorageKeys.UserToken);

	if (token) {
		return children;
	}
	return <Navigate to={'/auth/login'} replace />;
};

export default PrivateRoute;
