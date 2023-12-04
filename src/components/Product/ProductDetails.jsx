import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/products/${id}`);
        response.data.image = 'http://localhost:3500/storage/images/'+response.data.image;
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {product ? (
          <div>
            <h2>{product.name}</h2>
            <div className="row">
              <div className="col-md-4">
                <img src={product.image} alt={product.name} className="img-fluid" />
              </div>
              <div className="col-md-8">
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Quantity:</strong> {product.quantity}</p>
                {/* Add more product details as needed */}
                <Link to={`/products/${id}/edit`} className="btn btn-primary">
                  Edit Product
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
