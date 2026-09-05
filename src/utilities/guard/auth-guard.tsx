import { ReactElement, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { session } from '../helpers';
import { SESSION_KEYS } from '../constant';
import { useAppSelector } from 'store/hooks';

interface Props {
  children: ReactElement;
}

const AuthGuard = ({ children }: Props) => {
  const token = useAppSelector((store) => store.authState.token);

  if (token) {
    return children;
  }

  return <Navigate to={'/auth/login'} replace />;
};

export default AuthGuard;
