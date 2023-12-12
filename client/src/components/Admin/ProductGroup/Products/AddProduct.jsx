import React, { useRef, useState } from "react";
import { createProduct } from "../../../../functions/fetchingProducts";
import "./AddProduct.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
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
    ingredients: "",
    category: { primary: "", secondary: "" },
  });

  const closeModal = () => {
    closeEditModal();
  };

  const [selectedImages, setSelectedImages] = useState([]); //preview images
  const maxImages = 5; // limite de images
  const inputRef = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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
      if (
        product.title !== "" &&
        product.dimensions !== "" &&
        product.description !== "" &&
        product.price !== 0 &&
        product.category.primary !== "" &&
        product.category.secondary !== ""
      ) {
        await createProduct(product, selectedImages, token);
        Swal.fire({
          title: "¡Guardado!",
          text: "El producto se ha guardado correctamente.",
          icon: "success",
        });
        window.location.reload();
      }
      closeEditModal();
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al guardar el producto. Por favor, inténtalo de nuevo.",
        icon: "error",
      });
    }
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
        <div className="label-input-container">
          <label>Titulo:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="label-input-container">
          <label>Dimensiones: (cc, ml, grs, unidad.)</label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="label-input-container">
          <label>Descripción:</label>
          <textarea
            className="textarea-form-edit-product-adm"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="label-input-container">
          <label>Ingredientes:</label>
          <textarea
            className="textarea-form-edit-product-adm"
            name="ingredients"
            value={product.ingredients}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-edit-precio-sock">
          <div className="price-formEdit">
            <label>Precio: $</label>
            <input
              type="number"
              name="price"
              placeholder="$"
              value={product.price}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="container-categories-modal-admin">
          <label>Categorías:</label>

          {product && (
            <SelectCategoryProduct product={product} setProduct={setProduct} />
          )}
        </div>

        <div
          className="image-upload-container"
          style={{ display: "flex", gap: "15px" }}
        >
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            multiple
            className="upload-input"
            ref={inputRef}
            accept="image/*"
          />

          <div className="img-edit-product">
            {selectedImages &&
              selectedImages.map((image, index) => (
                <div className="img-addProduct-admin-container ">
                  <img
                    className="img-addProduct-admin"
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Image ${index}`}
                  />
                  <button
                    className="btn-delet-img-new-producto"
                    type="button"
                    onClick={() => handleImageRemove(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="container-save-product-btn">
          <button className="save-product-btn" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
