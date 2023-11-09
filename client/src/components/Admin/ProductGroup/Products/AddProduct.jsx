import React, { useRef, useState } from "react";
import {
  createProduct,
} from "../../../../functions/fetchingProducts";
import "./AddProduct.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import SelectCategoryProduct from "../../../SelectCategoryProduct/SelectCategoryProduct";

const AddProduct = ({ closeEditModal }) => {
  const token = GetDecodedCookie("cookieToken");
  const [product, setProduct] = useState({
    title: "",
    dimensions: "",
    description: "",
    price: 0,
    stock: 0,
    category: { primary: "", secondary: "" },
  });

  const [selectedImages, setSelectedImages] = useState([]); //preview images
  const maxImages = 5; // limite de images
  const inputRef = useRef();

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const selected = Array.from(files);

    if (selectedImages.length + selected.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas.`); //reemplazar este alert por sweetAlert
    } else {
      setSelectedImages((prevSelected) => [...prevSelected, ...selected]); //hace el prev de las imagenes y las agrega si no hay mas de 5
    }
    inputRef.current.value = "";
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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
      await createProduct(product, selectedImages, token);
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
            placeholder="ML/CC/CM/UNIDAD"
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
          <div className="price-formEdit">
            <label>Precio: $</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="stock-formEdit">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="container-categories-modal-admin">
          <label>Categoría:</label>
          <SelectCategoryProduct setProduct={setProduct} product={product} />
        </div>

        <div className="image-upload-container">
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            multiple
            className="upload-input"
            ref={inputRef}
            accept="image/*"
          />
          <div style={{ display: "flex", gap: "15px" }}>
            {selectedImages.map((image, index) => (
              <div className="img-addProduct-admin-container">
                <img 
                className="img-addProduct-admin"
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                
                />
                <button type="button" onClick={() => handleImageRemove(index)}>
                <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
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
