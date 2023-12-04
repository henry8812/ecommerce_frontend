import React from 'react';
import Navbar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="container py-3">
                <header>
                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal text-body-emphasis">Actions</h1>
                        <p className="fs-5 text-body-secondary">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
                    </div>
                </header>
                <main>
                    <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                        <div className="col-6">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Create Product</h4>
                                </div>
                                <div className="card-body">
                                    <p>This option will allow you to create new products on the market place</p>
                                    <Link to='/admin/products/new' className="w-100 btn btn-lg btn-outline-primary">Create</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">List Products</h4>
                                </div>
                                <div className="card-body">
                                    <p>This option will allow you to list the products that exist on the market place</p>
                                    <Link to='/' className="w-100 btn btn-lg btn-primary">List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Admin;
