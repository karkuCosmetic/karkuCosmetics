// App.js
import React from "react";

import ProductManagement from "../../components/Admin/Products/products";
import SalesManagement from "../../components/Admin/Sales/sales";
import ProductUpload from "../../components/UserAdmin/ProductUpload/productUpload";

const HomeAdmin = () => {
  return (
    <div>
      <ProductUpload />
      <ProductManagement />
      <SalesManagement />
    </div>
  );
};
export default HomeAdmin;
