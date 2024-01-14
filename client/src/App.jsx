// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import {
  Login,
  Error,
  Home,
  About,
  Register,
  Products,
  Checkout,
} from './pages';
import { AuthProvider } from './context/AuthContext ';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<Error />} />
            <Route path='/products' element={<Products />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
