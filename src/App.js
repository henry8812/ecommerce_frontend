import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginForm from './components/Auth/LoginForm';
import PrivateRoute from './components/Auth/PrivateRoute';
import CreateProduct from './components/Product/CreateProduct';
import EditProduct from './components/Product/EditProduct';
import ProductDetails from './components/Product/ProductDetails';
import Admin from './components/Admin/Admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/admin" element={<PrivateRoute element={Admin} />} />
                
        <Route path="/admin/products/new" element={<PrivateRoute element={CreateProduct} />}/>
        
        <Route path="/products/:id/edit" element={<PrivateRoute element={EditProduct} />}/>
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Home/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
