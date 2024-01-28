import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  //  user login state
  const [authLogin, setAuthLogin] = useState({
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    user: JSON.parse(localStorage.getItem('user_access')) || {},
  });

  // storing tokens
  const storeTokens = useCallback((access, refresh, userData) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Ensure 'authLogIn.userData' is defined before using JSON.stringify
    if (userData) {
      localStorage.setItem('user_access', JSON.stringify(userData));
      setAuthLogin({
        accessToken: access,
        refreshToken: refresh,
        user: userData,
      });
    } else {
      // Handle the case where userData is undefined or null
      console.error('userData is undefined or null');
    }
  }, []);

  // clearing tokens
  const clearTokens = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_access');

    navigate('/login');
  }, [navigate]);

  // token interval
  const tokenRefreshInterval = useCallback(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/users_api/login/',
          {
            refresh: authLogin.refreshToken,
          }
        );

        const { access_token } = response.data;

        setAuthLogin((prevAuthLogin) => ({
          ...prevAuthLogin,
          accessToken: access_token,
        }));
        localStorage.setItem('access_token', access_token);
        if (response.status !== 200) {
          clearTokens();
          clearInterval(intervalId);
          return;
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
      // Interval set to 29 minutes
    }, 29 * 60 * 1000);

    return intervalId;
  }, [authLogin.refreshToken, clearTokens]);

  // Only start the token refresh interval if the user is logged in
  useEffect(() => {
    if (authLogin.accessToken && authLogin.refreshToken) {
      const intervalId = tokenRefreshInterval();
      return () => clearInterval(intervalId);
    } else {
      clearTokens();
    }
  }, [
    authLogin.accessToken,
    authLogin.refreshToken,
    authLogin.user,
    clearTokens,
    tokenRefreshInterval,
  ]);

  return (
    <AuthContext.Provider value={{ ...authLogin, storeTokens, clearTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
