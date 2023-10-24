import React, { useState } from "react";
import "./Admin.css";

import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import MessageManagement from "../../components/Admin/MessageGroup/MessageManagement/MessageManagement";
import PreviewMessage from "../../components/Admin/MessageGroup/PreviewMessage/PreviewMessage";
import PreviewProduct from "../../components/Admin/ProductGroup/PreviewProduct/PreviewProduct";
import PreviewSales from "../../components/Admin/SalesGroup/PreviewSales/PreviewSales";
import ProductManagement from "../../components/Admin/ProductGroup/ProductManagement/ProductManagement ";
import SalesManagement from "../../components/Admin/SalesGroup/SalesManagement/SalesManagement";

const HomeAdmin = () => {
  const [section, setSection] = useState("Home");
  return (
    <div className="home-admin">
      <NavbarAdmin />
      {section === "Home" ? (
        <div className="product-sales-message-container">
          <div className="product-sales-container">
            <div className="product-management">
              <PreviewProduct setSection={setSection} />
            </div>
            <div className="sales-management">
              <PreviewSales setSection={setSection} />
            </div>
          </div>
          <div className="messages-container">
            <PreviewMessage setSection={setSection} />
          </div>
        </div>
      ) : section === "Product" ? (
        <ProductManagement setSection={setSection} />
      ) : section === "Message" ? (
        <MessageManagement setSection={setSection} />
      ) : section === "Sales" ? (
        <SalesManagement setSection={setSection} />
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeAdmin;
