import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EditProduct from "../Products/EditProduct";
import "./ProductManagement.css";
import {
  getProduct,
  getProductDetail,
  createProduct,
  DeleteProductById,
  updateProduct,
} from "../../../../functions/fetchingProducts";

const ProductManagement = ({ setSection }) => {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    getProduct()
      .then((data) => {
        setProducts(data.map((product) => ({ ...product, isDeleting: false })));
      })
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const handleAddProduct = async () => {
    try {
      const newProductData = await createProduct(newProduct);
      setNewProduct("");
      setProducts([...products, newProductData]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, isDeleting: true } : product
      )
    );
  };

  const handleEditClick = async (product) => {
    try {
    await getProductDetail(product._id).then(data=>setEditedProduct(data.product));
      setIsEditing(true);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(false);
  };

  const closeEditModal = () => {
    setEditedProduct({});
    setIsEditing(false);
    setEditModalOpen(false);
  };

  const handleDeleteConfirmation = async (productId) => {
    try {
      await DeleteProductById(productId);

      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="productManagement-container">
      <h2>Gestión de Productos</h2>
      <button onClick={() => setSection("Home")}>Volver</button>

      <div className="product-search-admin">
        <input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <div className="product-image-admin" key={product._id}>
              <img src={product.image[0]} alt={product.title} />
              <div className="product-list-admin">
                <p className="">{product?.title}</p>
                <p className="">${product?.price}</p>
                <button onClick={() => openProductModal(product)}>
                  Ver Producto
                </button>
                <button onClick={() => handleDeleteProduct(product._id)}>
                  Eliminar
                </button>
                {product.isDeleting && (
                  <div>
                    <p>Confirmar Borrado de producto?</p>
                    <button
                      onClick={() => handleDeleteConfirmation(product._id)}
                    >
                      Confirmar
                    </button>
                  </div>
                )}
                <button onClick={() => handleEditClick(product)}>Editar</button>
              </div>
            </div>
          ))}
      </div>
      <button onClick={handleAddProduct}>Agregar Producto</button>

      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={closeProductModal}
        contentLabel="Detalles del Producto"
      >
        {selectedProduct && (
          <div>
            <h2>Detalles del Producto</h2>
            <p>Nombre: {selectedProduct?.title}</p>
            <p>Precio: ${selectedProduct?.price}</p>
            <p>Descripción: {selectedProduct?.description}</p>
            {selectedProduct.image.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${selectedProduct.title} - Imagen ${index + 1}`}
              />
            ))}
            <button onClick={closeProductModal}>Cerrar</button>
          </div>
        )}
      </Modal>
      {isEditing && editModalOpen && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Editar Producto"
        >
          <div>
            <EditProduct
              match={{ params: { id: editedProduct._id } }}
              // product={editedProduct}
            />
            <button onClick={closeEditModal}>Cerrar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
