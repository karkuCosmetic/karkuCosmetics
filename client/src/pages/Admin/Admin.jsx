import React, {useState} from 'react';
import './Admin.css';

import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import MessageManagement from '../../components/Admin/MessageGroup/MessageManagement/MessageManagement';
import PreviewMessage from '../../components/Admin/MessageGroup/PreviewMessage/PreviewMessage';
import PreviewProduct from '../../components/Admin/ProductGroup/PreviewProduct/PreviewProduct';
import PreviewSales from '../../components/Admin/SalesGroup/PreviewSales/PreviewSales';
import ProductManagement from '../../components/Admin/ProductGroup/ProductManagement/ProductManagement ';
import SalesManagement from '../../components/Admin/SalesGroup/SalesManagement/SalesManagement';

// import ProductUpload from "../../components/UserAdmin/ProductUpload/productUpload";

const HomeAdmin = () => {
  const [section, setSection] = useState ('Home'); //Home,Product,Message,Sales
  return (
    <div>
      {/* <NavbarAdmin /> */}
      <div className="home-admin">
        {section === 'Home'
          ? <div>
              <div className="product-management">
                {/* <ProductUpload /> */}
                <PreviewProduct setSection={setSection} />
              </div>
              <div className="product-upload">
                <PreviewMessage setSection={setSection} />
              </div>
              <div className="sales-management" />
              <PreviewSales setSection={setSection} />
            </div>
          : section === 'Product'
              ? <ProductManagement setSection={setSection} />
              : section === 'Message'
                  ? <MessageManagement setSection={setSection} />
                  : section === 'Sales'
                      ? <SalesManagement setSection={setSection} />
                      : ''}
      </div>
    </div>
  );
};

export default HomeAdmin;
