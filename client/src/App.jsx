// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Error, Home, About, Register, Products } from './pages';
import { AuthProvider } from './context/AuthContext ';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<Error />} />
            <Route path='/products' element={<Products />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
