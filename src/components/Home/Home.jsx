import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
import styles from './Home.module.css';
import productService from '../../services/Products';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory


const Home = () => {
  const navigate = useNavigate(); // Inicializa navigate

  const [token, setToken] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 100,
    name: '',
  });

  useEffect(() => {

    setToken(sessionStorage.getItem('token'));

    productService.list().then(response => {
      setProducts(response);
    })
      .catch(error => {
        console.error('Error fetching products:', error);

      })

    productService.listCategories()
      .then(response => {
        setCategories(response);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });


  }, []);

  const deleteProduct = (productID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        let res = await productService.delete(productID)
        console.log(res)
        if(res.error !== undefined ){
          sessionStorage.clear()
          window.location = ''
        }else{
          console.log(res)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then( () => {
            window.location.reload(); // Esto recarga la página
  
          });
        }
        
      }
    });
  }

  const applyFilters = () => {
    axios.get('http://localhost:3500/api/products', { params: filters })
      .then(response => {

        // Modificar las URLs de las imágenes
        response.data.map(product => {
          // Agregar la URL base al campo de la imagen
          // Asumiendo que 'image' es el campo que almacena el nombre de la imagen
          if (product.image) {
            product.image = `http://localhost:3500/storage/images/${product.image}`;
          }
          return product;
        });


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
          <div className="row g-1">

            <div className="col-6">
              <label className="form-label" htmlFor="inlineFormSelectPref">Category</label>
              <select data-mdb-select-init className="select form-control" id='inlineFormSelectPref' onChange={e => setFilters({ ...filters, category: e.target.value })}>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="form9Example1">Name</label>
              <input type="text" id="form9Example1" className="form-control" value={filters.name}
                onChange={e => setFilters({ ...filters, name: e.target.value })} />


            </div>

          </div>
          <div className="row g-1">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <input type="text" id="form9Example1" className="form-control" value={filters.minPrice}
                  onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
                <label className="form-label" htmlFor="form9Example1">From Value</label>
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <input type="text" id="form9Example1" className="form-control" value={filters.maxPrice}
                  onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
                <label className="form-label" htmlFor="form9Example1">To Value</label>
              </div>
            </div>

          </div>



          <button onClick={applyFilters}>Buscar</button>
        </div>
        <div className={styles.products}>

          {products.map(product => (
            <div key={product.id} className={styles['product-item']} style={{ height:'320px'}}>
              <img style={{ width: 'initial'}} src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a href={`/products/${product.id}`}>Ver detalle</a>
              {(token !== null && token !== undefined)  ? 
      <a style={{float:'right'}} onClick={() => deleteProduct(product.id)}>Eliminar</a>  
      : ''}            </div>
          ))}
          {products.length === 0 ? 'There is not results' : ''}
        </div>
      </div>
    </div>
  );
};

export default Home;
