import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { LINKS } from 'utilities';

const useLogoutUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return () => {
    navigate(LINKS.Login);
    dispatch(logout());
  };
};

export default useLogoutUser;
