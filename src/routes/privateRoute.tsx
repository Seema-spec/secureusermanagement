import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../store';
import { setAuthenticated } from '../features/auth/authSlice'; 

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!isAuthenticated) {
        dispatch(setAuthenticated(token)); 
      }
    }
  }, [dispatch, isAuthenticated]);

  console.log(location.pathname,);
  
  if (location.pathname === '/' && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
