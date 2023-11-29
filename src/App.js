// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/Auth/LoginForm';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
