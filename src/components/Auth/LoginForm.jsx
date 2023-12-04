import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'; // Importa los estilos
import authService from '../../services/Auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {

    e.preventDefault();

    let response = await authService.login({ email, password })

    if (response.token) {
      sessionStorage.setItem('token', response.token);

      authService.startTokenRefresh();

      window.location.href = "/admin"// Redirect to admin view
    } else {
      console.log("no")
    }


  };

  return (


    <section className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>


              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>


              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">

                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
               
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>

  );
};

export default LoginForm;
