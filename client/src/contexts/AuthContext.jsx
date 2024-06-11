import axios from 'axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ACCESS } from '../actions/actions';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  //  user login state
  const [authLogin, setAuthLogin] = useState({
    accessToken: localStorage.getItem(ACCESS_TOKEN) || '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN) || '',
    user: JSON.parse(localStorage.getItem(USER_ACCESS)) || {},
  });
  // storing tokens
  const storeTokens = useCallback((access, refresh, userData) => {
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    // Ensure 'authLogIn.userData' is defined before using JSON.stringify
    if (userData) {
      localStorage.setItem(USER_ACCESS, JSON.stringify(userData));
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
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_ACCESS);
    navigate('/login');
  }, [navigate]);
  // token interval
  const tokenRefreshInterval = useCallback(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/users_api/refresh_token/',
          {
            refresh: authLogin.refreshToken,
          }
        );
        const { access_token } = response.data;
        setAuthLogin((prevAuthLogin) => ({
          ...prevAuthLogin,
          accessToken: access_token,
        }));
        localStorage.setItem(ACCESS_TOKEN, access_token);
        console.log('new access');
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
// creating custom hook
const useAuth = () => {
  return useContext(AuthContext);
};
export { AuthContext, AuthProvider, useAuth };
