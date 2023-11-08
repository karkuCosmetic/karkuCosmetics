import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import EditProduct from "../Products/EditProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddProduct from "../Products/AddProduct";
import "./ProductManagement.css";
import {
  getProduct,
  getProductDetail,
  createProduct,
  DeleteProductById,
  updateProduct,
} from "../../../../functions/fetchingProducts";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const productsPerPage = 15;
  const MySwal = withReactContent(Swal);
  const token = GetDecodedCookie("cookieToken");
  
  useEffect(() => {
    getProduct()
      .then((data) => {
        setProducts(data.map((product) => ({ ...product, isDeleting: false })));
      })
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

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

  const handleEditClick = async (product) => {
    try {
      await getProductDetail(product._id).then((data) =>
        setEditedProduct(data.product)
      );
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

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const handleDeleteConfirmation = async (productId) => {
    try {
      await DeleteProductById(productId,token);

      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  let clampedCurrentPage = currentPage;
  if (totalPages === 0) {
    clampedCurrentPage = 1;
  } else if (clampedCurrentPage > totalPages) {
    clampedCurrentPage = totalPages;
  }

  const indexOfLastProduct = clampedCurrentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const isNextButtonDisabled = clampedCurrentPage >= totalPages;

  return (
    <div className="productManagement-container">
      <div className="back-product-btn-container">
        <button className="back-product-btn" onClick={() => setSection("Home")}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <h2>Gestión de Productos</h2>
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
      <div className="product-search-admin">
        <input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="productManagement-list">
        {currentProducts
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <div className="product-image-admin" key={product._id}>
              <img src={product.image[0]} alt={product.title} />
              <div className="product-list-admin">
                <p className="">{product?.title}</p>
                <div className="buttons-productManagement">
                  <p className="">${product?.price}</p>
                  <button
                    className="show-product-btn"
                    onClick={() => openProductModal(product)}
                  >
                    Ver
                  </button>
                  <button
                    className="edit-product-btn"
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-product-btn"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination-productManagement">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-productManagement-info">
          {clampedCurrentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={isNextButtonDisabled}
        >
          Siguiente
        </button>
      </div>

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
                  alt={`${selectedProduct.title} - Imagen ${index + 1}`}
                  className="product-details-image"
                />
              ))}
            </div>
            <div className="product-details-buttons">
              <button
                className="edit-product-btn"
                onClick={() => handleEditClick(selectedProduct)}
              >
                Editar
              </button>
              <button
                className="delete-product-btn"
                onClick={() => handleDeleteProduct(selectedProduct._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </Modal>
      {isEditing && editModalOpen && (
        <Modal
          isOpen={editModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Editar Producto"
        >
          <div className="modal-edit-productManagement">
            <EditProduct
              match={{ params: { id: editedProduct._id } }}
              closeEditModal={closeEditModal}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;