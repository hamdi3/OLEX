import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //  initial state
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token') || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user_access')) || null
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
        const response = await axios.post(
          'http://127.0.0.1:8000/users_api/refresh_token/',
          {
            refresh: refreshToken,
          }
        );

        if (!response.status === 200) {
          clearTokens();
          return;
        }
        const { access_token } = response.data;

        setAccessToken(access_token);
        console.log('new Access token', accessToken);
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
      // Interval set to 29 minutes
    }, 29 * 60 * 1000);
    return intervalId;
  };

  useEffect(() => {
    if (accessToken && refreshToken && user) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      // only if user is logged in
      if (user !== null) {
        const intervalId = tokenRefreshInterval();
        return () => clearInterval(intervalId);
      }
    } else {
      clearTokens();
      navigate('/login');
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
