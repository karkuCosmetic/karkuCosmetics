import React, { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../../../functions/fetchingProducts";
import { fileUpload } from "../../../utils/fileUpload";
import Modal from "react-modal";
import EditProduct from "../Components/Products/EditProduct";

import "./products.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const productName = product.title.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return productName.includes(searchTermLower);
    })
    .slice(0, 5);

  const addProduct = (newProductData) => {
    const updatedProducts = [...products, newProductData];
    setProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);
  };

  const handleEditClick = (product) => {
    setEditedProduct(product);
    setIsEditing(true);
    setEditModalOpen(true);
  };

  const handleAddProduct = () => {
    addProduct(newProduct)
      .then(() => {
        setNewProduct("");
        return getProduct();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId)
      .then(() => getProduct())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleViewAllProducts = () => {
    setShowAllProducts(true);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <div className="product-search-admin">
        <input
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-image-admin" key={product._id}>
            <img src={product.image[0]} alt={product.title} />
            <div className="product-list-admin">
              <p className="">{product.title}</p>
              <p className="">${product.price}</p>
              <button onClick={() => openProductModal(product)}>
                Ver Producto
              </button>
              <button onClick={() => handleDeleteProduct(product._id)}>
                Borrar
              </button>
              <button onClick={() => handleEditClick(product)}>Editar</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleViewAllProducts}>Ver todos los productos</button>
      <button onClick={handleAddProduct}>Agregar Producto</button>

      {isEditing && editModalOpen && (
        <EditProduct match={{ params: { id: editedProduct._id } }} />
      )}

      <div className="modal-detail">
        {showAllProducts && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              setShowAllProducts(false);
            }}
          >
            <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
            <h2>Todos los Productos</h2>
            <div className="product-list">
              {products.map((product) => (
                <div className="product-image-admin" key={product._id}>
                  <img src={product.image[0]} alt={product.title} />
                  <div className="product-list-admin">
                    <p className="">{product.title}</p>
                    <p className="">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
