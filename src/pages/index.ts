import Login from './auth/login';
import Dashboard from './dashboard';
import ForgetPassword from './auth/forget-password';
import CreateNewPassword from './auth/create-new-password';
import Users from './users';

import LINKS from '../utilities/links';

const Pages = {
	Auth: {
		Login: {
			Component: Login,
			path: '/auth/login',
		},
		ForgetPassword: {
			Component: ForgetPassword,
			path: '/auth/forget-password',
		},
		CreateNewPassword: {
			Component: CreateNewPassword,
			path: LINKS.CreateNewPassword,
		},
	},
	Dashboard: {
		Component: Dashboard,
		path: '/',
	},
	User: {
		Initial: {
			Component: Users,
			path: LINKS.User,
		},
	},
};

export default Pages;
