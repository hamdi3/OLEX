import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Error, Home, About, Register } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Error />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
