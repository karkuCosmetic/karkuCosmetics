import React, { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../../../functions/fetchingProducts";
import { fileUpload } from "../../../utils/fileUpload";
import Modal from "react-modal";
import "./products.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

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
    setIsModalOpen(true);
  };

  const handleSaveEditedProduct = () => {
    updateProduct(editedProduct)
      .then(() => {
        setIsEditing(false);
        setIsModalOpen(false);
        return getProduct();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("Solo se permiten hasta 5 imágenes.");
      return;
    }

    try {
      const uploadedUrls = await fileUpload(files, "product");
      setUploadedImageUrls(uploadedUrls);
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    }
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

      <button onClick={() => setIsModalOpen(true)}>
        Ver todos los productos
      </button>
      <button onClick={handleAddProduct}>Agregar Producto</button>

      {isEditing && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
          <h2>Editar Producto</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Título del Producto:</label>
              <input
                type="text"
                id="title"
                value={editedProduct.title}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="dimensions">Dimensiones:</label>
              <input
                type="text"
                id="dimensions"
                value={editedProduct.dimensions}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    dimensions: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                value={editedProduct.description}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio:</label>
              <input
                type="number"
                id="price"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Cargar Imágenes:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="image-preview">
                {uploadedImageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Preview ${index}`}
                    className="image-thumbnail"
                  />
                ))}
              </div>
            </div>

            <button onClick={handleSaveEditedProduct}>Guardar Cambios</button>
          </form>
        </Modal>
      )}
      <div className="modal-detail">
        <Modal
          isOpen={isProductModalOpen}
          onRequestClose={() => setIsProductModalOpen(false)}
        >
          <button onClick={() => setIsProductModalOpen(false)}>Cerrar</button>
          {selectedProduct && (
            <div className="detail-product-modal-admin">
              <h2>Detalles del Producto</h2>
              <img src={selectedProduct.image[0]} alt={selectedProduct.title} />
              <p>{selectedProduct.title}</p>
              <p>${selectedProduct.price}</p>
              <p>{selectedProduct.description}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default ProductManagement;
