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
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const MySwal = withReactContent(Swal);

  const token = GetDecodedCookie("cookieToken");
  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

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

  const handleEditClick = async (product) => {
    try {
      console.log("Product ID:", product._id);
      await getProductDetail(product._id).then((data) => {
        console.log("Product Details:", data);
        setEditedProduct(data.product);
      });
      setIsEditing(true);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
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

  const handleDeleteConfirmation = async (id) => {
    try {
      await DeleteProductById(id, token);

      const updatedProducts = products.filter(
        (product) => product._id !== selectedProduct
      );
      setProducts(updatedProducts);

      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
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
                          <h2 className="product-details-title">
                            Detalles del Producto
                          </h2>
                          <p className="product-details-p">
                            <span>Nombre: </span>
                            {selectedProduct?.title}
                          </p>
                          <p className="product-details-p">
                            <span>Precio: </span>${selectedProduct?.price}
                          </p>
                          <p className="product-details-p">
                            <span>Descripción: </span>
                            {selectedProduct?.description}
                          </p>
                        </div>
                        <div className="product-details-image-container">
                          {selectedProduct.image.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`${selectedProduct.title} - Imagen ${
                                index + 1
                              }`}
                              className="product-details-image"
                            />
                          ))}
                        </div>
                        <div className="product-details-buttons">
                          <button
                            className="edit-product-btn"
                            onClick={() => handleEditClick(selectedProduct._id)}
                          >
                            Editar
                          </button>
                          <button
                            className="delete-product-btn"
                            onClick={() =>
                              handleDeleteProduct(selectedProduct._id)
                            }
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </Modal>
                  <button
                    className="show-product-btn-preview"
                    onClick={() => openProductModal(product)}
                  >
                    Ver producto
                  </button>
                </div>
              </li>
            ))}
      </ul>

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
          productId={selectedProduct?._id}
          productDetails={selectedProductDetails}
          closeEditModal={closeEditModal}
        />
      </Modal>
    </div>
  );
};

export default PreviewProduct;
