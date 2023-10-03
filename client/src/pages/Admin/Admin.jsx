import React from "react";
import "./Admin.css";

import ProductManagement from "../../components/Admin/Products/products";
import SalesManagement from "../../components/Admin/Sales/sales";
import ProductUpload from "../../components/UserAdmin/ProductUpload/productUpload";

const HomeAdmin = () => {
  return (
    <div className="home-admin">
      <div className="product-management">
        <ProductManagement />
      </div>
      <div className="product-upload"> 
      <p>MENSAJES </p>
        <ProductUpload />
      </div>
      <div className="sales-management"> 
        <SalesManagement />
      </div>
    </div>
  );
};

export default HomeAdmin;
