import React, { useState, useEffect } from 'react';
import productService from '../../services/Products';
import Swal from 'sweetalert2'


const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    image: null,
    category: '',
    price : 0
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from a service or API
    const fetchCategories = async () => {
      try {
        const categories = await productService.listCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('category_id', formData.category);
    formDataToSend.append('price', formData.price);
    


    try {
      await productService.create(formDataToSend);
      Swal.fire({
        
        icon: "success",
        title: "The new product has been saved",
        showConfirmButton: false,
        timer: 1500
      });

      // Product created successfully, handle success
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle product creation error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Name:</label>
          <input type="text" className="form-control" id="productName" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Description:</label>
          <textarea className="form-control" id="productDescription" name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="productQuantity" className="form-label">Quantity:</label>
          <input type="number" className="form-control" id="productQuantity" name="quantity" value={formData.quantity} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleInputChange} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Image:</label>
          <input type="file" className="form-control" id="productImage" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">Category:</label>
          <select className="form-select" id="productCategory" name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
