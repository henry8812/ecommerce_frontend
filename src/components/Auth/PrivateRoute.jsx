import React from 'react';
import {  Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const auth = sessionStorage.getItem('token'); // Verificando la autenticación

  return auth ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;
