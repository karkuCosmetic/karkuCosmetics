import React, { useState, useEffect } from "react";
import {
  getProductDetail,
  updateProduct,
} from "../../../../functions/fetchingProducts";
import "./EditProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditProduct = ({ match, closeEditModal }) => {
  const [product, setProduct] = useState({});

  const id = match.params.id;

  useEffect(() => {
    fetchingdetail()
      .then((data) => setProduct(data.product))
      .catch("error");
  }, []);

  const fetchingdetail = async () => {
    const data = await getProductDetail(id);
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(product, product._id);
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const closeModal = () => {
    closeEditModal();
  };

  return (
    <div className="form-updateProduct">
      <div className="container-close-btn">
        <button className="product-details-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <h2 className="h2-form-updateProduct">Editar Producto</h2>
      <form className="form-edit-product-admin" onSubmit={handleSubmit}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Dimensiones:</label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
          className="textarea-form-edit-product-adm"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-edit-precio-sock">
          <label>Precio: $</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="container-save-product-btn">
        <button className="save-product-btn" type="submit">
          Guardar Cambios
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
