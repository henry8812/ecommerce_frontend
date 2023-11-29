// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; // Asegúrate de tener el archivo CSS del módulo

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
       
      

      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
        <li>
          <Link to="/about">Sobre Nosotros</Link>
        </li>
        <li className={styles.dropdown}>
          <button className={styles.dropbtn}>Perfil</button>
          <div className={styles.dropdownContent}>
            <Link to="/profile">Mi Perfil</Link>
            <Link to="/logout">Cerrar Sesión</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
