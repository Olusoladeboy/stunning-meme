import { ReactElement, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { session } from '../helpers';
import { SESSION_KEYS } from '../constant';

interface Props {
  children: ReactElement;
}

const AuthGuard = ({ children }: Props) => {
  let tokenRef = useRef<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    session.getSession(SESSION_KEYS.AccessToken).then((value) => {
      tokenRef.current = value?.accessToken;

      setLoading(false);
    });
  }, []);

  if (isLoading) return null;

  if (tokenRef.current) {
    return children;
  }

  return <Navigate to={'/auth/login'} replace />;
};

export default AuthGuard;
