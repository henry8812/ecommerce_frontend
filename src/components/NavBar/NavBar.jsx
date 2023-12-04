import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="/">Navbar</a>
        <div className="nav">
          <Link to="/" className="nav-link active" aria-current="page">Products</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
