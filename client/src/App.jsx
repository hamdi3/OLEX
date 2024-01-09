// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Error, Home, About, Register } from './pages';
import { AuthProvider } from './context/AuthContext ';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
