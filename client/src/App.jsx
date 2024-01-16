// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Login,
  Error,
  Home,
  About,
  Register,
  Products,
  Checkout,
  SingleProduct,
} from './pages';
import { AuthProvider } from './context/AuthContext ';
import { ProductProvider } from './context/ProductContext';
import { ProtectedRoute } from './pages/ProtectedRoute ';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Error />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />

              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<SingleProduct />} />
              <Route path='/checkout' element={<Checkout />} />
            </Route>
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
