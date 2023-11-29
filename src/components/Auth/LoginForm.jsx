import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Importa los estilos

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let config = {
        method: 'post',
        url: 'http://localhost:3500/api/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email,
          password,
        }
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        window.location.href = "/"// Redirige a la raíz
      }

    } catch (error) {
      // Manejar errores, como credenciales inválidas, problemas de red, etc.
      setError('Credenciales inválidas');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
