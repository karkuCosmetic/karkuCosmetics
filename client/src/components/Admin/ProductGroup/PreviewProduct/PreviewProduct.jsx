import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  getProduct,
  DeleteProductById,
  getProductDetail,
} from "../../../../functions/fetchingProducts";
import "./PreviewProduct.css";
import EditProduct from "../Products/EditProduct";

const PreviewProduct = ({ setSection }) => {
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = async (productId) => {
    setDeletingProductId(productId);
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

  const handleDeleteConfirmation = async () => {
    if (deletingProductId !== null) {
      try {
        await DeleteProductById(deletingProductId);

        const updatedProducts = products.filter(
          (product) => product._id !== deletingProductId
        );
        setProducts(updatedProducts);

        setDeletingProductId(null);
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  return (
    <div className="previewProduct-container">
      <h2>Productos</h2>
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
                <img src={product.image[0]} alt={product.title} />
                {product.title} ${product.price}
                <button onClick={() => handleEditProduct(product._id)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product._id)}>
                  Eliminar
                </button>
              </li>
            ))}
      </ul>

      {!showAllProducts && (
        <button onClick={() => setSection("Product")}>Ver todos</button>
      )}

      {deletingProductId !== null && (
        <div>
          <p>Confirmar Borrado de producto?</p>
          <button onClick={handleDeleteConfirmation}>Confirmar</button>
        </div>
      )}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <EditProduct
          match={{ params: { id: selectedProduct } }}
          productDetails={selectedProductDetails}
        />
      </Modal>
    </div>
  );
};

export default PreviewProduct;
