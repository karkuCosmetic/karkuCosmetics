import React, { useState } from "react";
import {
  createProduct,
  updateProduct,
} from "../../../../functions/fetchingProducts";
import "./AddProduct.css";
import { fileUpload } from "../../../../utils/fileUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddProduct = ({ closeEditModal }) => {
  const [product, setProduct] = useState({
    title: "",
    dimensions: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [images, setImages] = useState([]); // buffer de images
  const [imageurls, setImageurls] = useState(null); //array de urls de cloudinary

  const handleImageUpload = (event) => {
    const selectedFiles = event.target.files;
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handlerSubmitImage = async () => {
    await fileUpload(images, "products").then((res) => {
      setImageurls(res);
      updateProduct(res);
    });
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
      await createProduct(product);
      closeEditModal();
    } catch (error) {
      console.error("Error creating product:", error);
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
      <h2 className="h2-form-updateProduct">Nuevo Producto</h2>
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

        <div className="image-upload-container">
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => handleImageUpload(e)}
            multiple
            className="upload-input"
          />
          <button
            onClick={handlerSubmitImage}
            disabled={!images.length}
            className="upload-button"
          >
            Subir foto
          </button>
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

export default AddProduct;
