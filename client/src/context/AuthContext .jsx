import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from './instance';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  const storeTokens = (access, refresh, userData) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user_access', JSON.stringify(userData));
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(userData);
  };

  const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_access');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    const storedUserData = localStorage.getItem('user_access');

    if (storedAccessToken && storedRefreshToken && storedUserData) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const tokenReplacementInterval = setInterval(async () => {
      try {
        console.log('Token replacement initiated');

        const storedRefreshToken = localStorage.getItem('refresh_token');

        if (storedRefreshToken) {
          const response = await instance.post('/users_api/refresh_token/', {
            refresh_token: storedRefreshToken,
          });

          const { access_token } = response.data;

          console.log('New access token received at:', new Date());

          localStorage.setItem('access_token', access_token);
          setAccessToken(access_token);
        }
      } catch (error) {
        clearTokens();
        console.error('Token replacement failed:', error);
      }
    }, 29 * 60);

    return () => clearInterval(tokenReplacementInterval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, storeTokens, clearTokens, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
