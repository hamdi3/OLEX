import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import authFetch from '../axios/authFetch';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //  initial state
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token')
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token')
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user_access'))
  );

  // storing tokens
  const storeTokens = (access, refresh, userData) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_access', JSON.stringify(userData));
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(userData);
  };

  // clearing tokens
  const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_access');

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/login');
  };

  // token interval
  const tokenRefreshInterval = () => {
    const intervalId = setInterval(async () => {
      try {
        const response = await authFetch.post('/refresh_token/', {
          refresh: refreshToken,
        });

        const { access_token } = response.data;

        setAccessToken(access_token);
        localStorage.setItem('access_token', access_token);
        if (response.status !== 200) {
          clearTokens();
          return;
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
      // Interval set to 29 minutes
    }, 29 * 60 * 1000);
    return intervalId;
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      // Only start the token refresh interval if the user is logged in
      const intervalId = tokenRefreshInterval();
      console.log('interval starting');
      return () => clearInterval(intervalId);
    } else {
      clearTokens();
    }
  }, [accessToken, refreshToken, user]);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, storeTokens, clearTokens, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
