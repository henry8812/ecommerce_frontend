import React, { useState, useEffect } from 'react';
import productService from '../../services/Products';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import URLS from '../../services/URLS.json';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';


const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    image: null,
    category: '',
    price: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const product = await productService.details(id);
        console.log(product)
        setFormData({
          name: product.name,
          description: product.description,
          quantity: product.quantity,
          category: product.category_id,
          price: product.price,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await productService.listCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProductDetails();
    fetchCategories();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Verifica los datos que se están enviando desde el formulario
    console.log('FormData:', formData);
  
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      // No necesitas definir Content-Type aquí si estás usando FormData
      // 'Content-Type': 'multipart/form-data',
    };
  
    try {
      const config = {
        method: 'PUT',
        url: URLS.PRODUCTS.UPDATE.path + id,
        headers: headers,
        data: {
          name: formData.name,
          description: formData.description,
          quantity: formData.quantity,
          category_id: formData.category,
          price: formData.price,
          // Otros campos si los hay
        },
      };
  
      const response = await axios.request(config);
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'The product has been updated',
        showConfirmButton: false,
        timer: 1500,
      }).then(
        window.location.href = '/'
      );
    } catch (error) {
      console.error('Error updating product:', error);
      sessionStorage.clear();   
      window.location.href = "/admin"
    }
  };
  
  
  return (
    <div>
        <Navbar></Navbar>
    <div className="container mt-5">
        
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="productDescription"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Category:
          </label>
          <select
            className="form-select"
            id="productCategory"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditProduct;
