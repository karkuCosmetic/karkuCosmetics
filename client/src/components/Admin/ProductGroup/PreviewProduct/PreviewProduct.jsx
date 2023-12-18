import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getProduct,
  DeleteProductById,
  getProductDetail,
} from "../../../../functions/fetchingProducts";
import "./PreviewProduct.css";
import EditProduct from "../Products/EditProduct";
import AddProduct from "../Products/AddProduct";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PreviewProduct = ({ setSection }) => {
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const MySwal = withReactContent(Swal);

  const token = GetDecodedCookie("cookieToken");
  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {
    MySwal.fire({
      title: "Confirmar Borrado",
      text: "¿Quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteConfirmation(productId);
      }
    });
  };

  const handleEditProduct = async (productId) => {
    setSelectedProduct(productId);
    setIsEditModalOpen(true);
    try {
      const productData = await getProductDetail(productId);
      setSelectedProductDetails(productData);
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  };

  const handleDeleteConfirmation = async (id) => {
    try {
      await DeleteProductById(id, token);

      const updatedProducts = products.filter(
        (product) => product._id !== selectedProduct
      );
      setProducts(updatedProducts);

      setSelectedProduct(null);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div className="previewProduct-container">
      <h2 className="previewProduct-h2">Productos</h2>
      <div>
        <button className="add-product-btn" onClick={openAddProductModal}>
          Agregar Producto
        </button>
      </div>
      <Modal
        isOpen={isAddProductModalOpen}
        onRequestClose={closeAddProductModal}
        contentLabel="Agregar Producto"
      >
        <AddProduct closeEditModal={closeAddProductModal} />
      </Modal>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {showAllProducts
          ? products.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))
          : filteredProducts.slice(0, 5).map((product) => (
              <li key={product._id}>
                <div className="previewProduct-container-img-title">
                  <img src={product.image[0]} alt={product.title} />
                  <div className="previewProduct-container-title">
                    {product.title}
                  </div>
                </div>
                <div className="previewProduct-container-buttons">
                  <div className="previewProduct-price">${product.price}</div>
                  <button
                    className="show-product-btn"
                    onClick={() => openProductModal(product)}
                  >
                    Ver
                  </button>
                  <button
                    className="previewProduct-container-buttons-edit"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="previewProduct-container-buttons-delete"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
      </ul>
      <Modal
        isOpen={isProductModalOpen}
        onRequestClose={closeProductModal}
        contentLabel="Detalles del Producto"
      >
        {selectedProduct && (
          <div className="product-details-container">
            <div className="details-product-text">
              <div className="close-modal-detail">
                <button
                  className="product-details-close-button"
                  onClick={closeProductModal}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 className="product-details-title">Detalles del Producto</h2>
              <div className="product-details-p-container">
              <p className="product-details-p">
                <span>Nombre: </span>
                {selectedProduct?.title}
              </p>
              </div>
              <div className="price-categories-container">
              <p className="product-details-p">
                <span>Precio: </span>${selectedProduct?.price}
              </p>
              <p className="product-details-p">
                <span>Categoría: </span>
                {selectedProduct?.category?.primary}
              </p>
              <p className="product-details-p">
                <span>Sub-Categoría: </span>
                {selectedProduct?.category?.secondary}
              </p>
              </div>
              <p className="product-details-p">
                <span>Descripción: </span>
                {selectedProduct?.description}
              </p>
              <p className="product-details-p">
                <span>Ingredientes: </span>
                {selectedProduct?.ingredients}
              </p>

            </div>
            <div className="product-details-image-container">
              {selectedProduct.image &&
                selectedProduct.image.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${selectedProduct.title} - Imagen ${index + 1}`}
                    className="product-details-image"
                  />
                ))}
            </div>
          </div>
        )}
      </Modal>
      {!showAllProducts && (
        <button
          className="button-showAll"
          onClick={() => setSection("Product")}
        >
          Ver todos
        </button>
      )}

      {selectedProduct !== null && (
        <div>
          <p>Confirmar Borrado de producto?</p>
          <button onClick={() => handleDeleteConfirmation(selectedProduct._id)}>
            Confirmar
          </button>
        </div>
      )}
      <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal}>
        <EditProduct
          match={{ params: { id: selectedProduct } }}
          productDetails={selectedProductDetails}
          closeEditModal={closeEditModal}
        />
      </Modal>
    </div>
  );
};

export default PreviewProduct;
