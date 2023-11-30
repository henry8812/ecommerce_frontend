import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/Auth/LoginForm';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/" element={<PrivateRoute element={Home} />} />
        {/* Otras rutas protegidas */}
      </Routes>
    </Router>
  );
}

export default App;
