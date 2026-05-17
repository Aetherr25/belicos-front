import React from 'react'
import { useAuthStore } from '../../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}


export const ProtectedRoute = ({children, allowedRoles}: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore ((state) => state.isAuthenticated);

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user?.roleName && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/" replace/>
  }

  return <>{children}</>;
}
