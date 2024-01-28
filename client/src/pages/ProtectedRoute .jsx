import { Header, Sidebar, Footer } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  if (!accessToken) {
    navigate('/login');
  }
  return (
    <>
      <Header />
      <Outlet />
      <Sidebar />
      <Footer />
    </>
  );
};

export default ProtectedRoute;
