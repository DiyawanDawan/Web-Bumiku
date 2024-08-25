import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// const ProtectedRoute: React.FC = () => {
//   // const isAuthenticated = !!localStorage.getItem('authToken');

//   // return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;


// };

// export default ProtectedRoute;
interface DecodedToken {
  role: string;
}

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/signin" />;
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;

