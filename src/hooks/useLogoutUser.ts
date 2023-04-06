import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/auth';

const useLogoutUser = () => {
	const dispatch = useAppDispatch();
	return () => {
		dispatch(logout());
	};
};

export default useLogoutUser;
