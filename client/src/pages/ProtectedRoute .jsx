import { useAuth } from '../context/AuthContext ';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  if (!accessToken) {
    navigate('/login');
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
