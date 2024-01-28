import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider, CartProvider, ProductProvider } from './contexts';
import {
  Register,
  About,
  Profile,
  Error,
  Login,
  ProtectedRoute,
  ProductDetails,
  Home,
} from './pages';
const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <AuthProvider>
          <SidebarProvider>
            <CartProvider>
              <ProductProvider>
                <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='*' element={<Error />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                  </Route>
                </Routes>
              </ProductProvider>
            </CartProvider>
          </SidebarProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
