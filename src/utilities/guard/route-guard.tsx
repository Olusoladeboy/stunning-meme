import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { useLogoutUser, useAlert } from 'hooks';
import LINKS from '../links';

interface Props {
	children: ReactNode;
	roles?: string[];
}

const RouteGuard: React.FC<Props> = ({ children, roles }) => {
	const navigate = useNavigate();
	const logout = useLogoutUser();
	const alert = useAlert();
	const { user } = useAppSelector((store) => store.authState);
	const [canViewRoute, setCanViewRoute] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			if (roles) {
				const canViewRoute = roles.includes(user.role as string);
				if (canViewRoute) return setCanViewRoute(canViewRoute);

				logout();
				navigate(LINKS.Login, { replace: true });
				alert({
					message: 'You are not authorize to view this page',
					type: 'info',
				});
			}
		}
	}, [user, roles, logout, alert, navigate]);

	return <>{canViewRoute && children}</>;
};

export default RouteGuard;
