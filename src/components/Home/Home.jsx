import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import styles from './Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 100,
    name: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3500/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get('http://localhost:3500/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const applyFilters = () => {
    axios.get('http://localhost:3500/api/products', { params: filters })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error applying filters:', error);
      });
  };

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.filters}>

          <div className="form-row">
            <select name="category" onChange={e => setFilters({ ...filters, category: e.target.value })}>
              <option value="">Selecciona una categoría</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <input
              type="number"
              name="minPrice"
              placeholder="Precio mínimo"
              value={filters.minPrice}
              onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Precio máximo"
              value={filters.maxPrice}
              onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Buscar por nombre"
              value={filters.name}
              onChange={e => setFilters({ ...filters, name: e.target.value })}
            />
          </div>



          <button onClick={applyFilters}>Buscar</button>
        </div>
        <div className={styles.products}>

          {products.map(product => (
            <div key={product.id} className={styles['product-item']}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a href={`/products/${product.id}`}>Ver detalle</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
