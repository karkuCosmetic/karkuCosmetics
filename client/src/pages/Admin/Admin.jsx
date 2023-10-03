import React from "react";
import "./Admin.css";

import ProductManagement from "../../components/Admin/Products/products";
import SalesManagement from "../../components/Admin/Sales/sales";
import ProductUpload from "../../components/UserAdmin/ProductUpload/productUpload";

const HomeAdmin = () => {
  return (
    <div className="home-admin">
      <div className="product-upload"> 
        <ProductUpload />
      </div>
      <div className="product-management">
        <ProductManagement />
      </div>
      <div className="sales-management"> 
        <SalesManagement />
      </div>
    </div>
  );
};

export default HomeAdmin;
