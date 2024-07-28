import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
