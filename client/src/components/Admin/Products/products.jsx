import React, { useState, useEffect } from "react";
import { getProduct } from "../../../functions/fetchingProducts";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./products.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

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
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const editProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleSaveEditedProduct = () => {
    setIsModalOpen(false);
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
              <Link to={`/product/${product._id}`}>Ver Producto</Link>
              <button onClick={() => deleteProduct(product.id)}>Borrar</button>
              <button onClick={() => editProduct(product.id)}>Editar</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>
        Ver todos los productos
      </button>
      <button onClick={handleAddProduct}>Agregar Producto</button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
        <h2>Todos los Productos</h2>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-image-admin" key={product._id}>
              <img src={product.image[0]} alt={product.title} />
              <div className="product-list-admin">
                <p className="">{product.title}</p>
                <p className="">${product.price}</p>
                <Link to={`/product/${product._id}`}>Ver Producto</Link>
                <button onClick={() => deleteProduct(product._id)}>
                  Borrar
                </button>
                <button onClick={() => editProduct(product._id)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default ProductManagement;
