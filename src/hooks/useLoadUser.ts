import { useQuery } from 'react-query';
import { useAppSelector, useAppDispatch } from '..//store/hooks';
import { QueryKeys, User } from '../utilities';
import { me } from '../api';
import { setUser } from '../store/auth';
import useToastAlert from './useToastAlert';
import useHandleResponse from './useHandleError';
import useLogout from './useLogoutUser';

const useLoadUser = () => {
	const { token } = useAppSelector((store) => store.authState);
	const logout = useLogout();
	const alert = useToastAlert();
	const handleResponse = useHandleResponse();
	const dispatch = useAppDispatch();

	// Load user
	useQuery([QueryKeys.Me], me, {
		enabled: !!token,
		retry: 1,
		onSettled: (data, error) => {
			if (error) {
				const response = handleResponse({ error });
				if (response?.message) {
					alert({ type: 'error', message: response.message });
				}
			}

			if (data && data.success) {
				if (Array.isArray(data.payload)) {
					const user: User = data.payload[0];
					if (user.suspended) {
						alert({
							message: 'Account has been suspended, Contact support',
							type: 'info',
						});
						return logout();
					}
					dispatch(setUser(user));
				} else {
					const user = data.payload as User;
					dispatch(setUser(user));
				}
			}
		},
	});
};

export default useLoadUser;
