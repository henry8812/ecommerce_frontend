import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../NavBar/NavBar'; // Asegúrate de tener un componente Navbar
import styles from './Home.module.css'; // Importa los estilos CSS del módulo

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los productos al cargar la página
    axios.get('URL_DE_TU_API/productos')
      .then(response => {
        setProducts(response.data); // Actualiza el estado con los productos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []); // Este efecto se ejecutará solo una vez al cargar la página

  return (
    <div>
      <Navbar />
      <h1>¡Bienvenido a la página principal!</h1>
      <div className={styles['products-container']}>
        {products.map(product => (
          <div key={product.id} className={styles['product-item']}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {/* Aquí podrías añadir un link al detalle del producto */}
            <a href={`/products/${product.id}`}>Ver detalle</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
