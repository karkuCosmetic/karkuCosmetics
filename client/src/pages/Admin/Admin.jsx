import React from "react";
import "./Admin.css";

import ProductManagement from "../../components/Admin/Products/products";
import SalesManagement from "../../components/Admin/Sales/sales";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
// import ProductUpload from "../../components/UserAdmin/ProductUpload/productUpload";

const HomeAdmin = () => {
  return (
    <>
      {/* <NavbarAdmin /> */}
      <div className="home-admin">
        <div className="product-management">
          <ProductManagement />
          {/* <ProductUpload /> */}
        </div>
        <div className="product-upload">
          <p>MENSAJES </p>
        </div>
        <div className="sales-management">
          <SalesManagement />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
