import React, { useState, useEffect, useRef } from "react";
import {
  getProductDetail,
  updateProduct,
} from "../../../../functions/fetchingProducts";
import "./EditProduct.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import SelectCategoryProduct from "../../../SelectCategoryProduct/SelectCategoryProduct";

const EditProduct = ({ match, closeEditModal }) => {
  const [product, setProduct] = useState({});
  const token = GetDecodedCookie("cookieToken");
  const id = match.params.id;

  //----------------------- actualizar images---------------
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
  //----------------------- actualizar images---------------
  useEffect(() => {
    fetchingdetail()
      .then((data) => {
        setProduct(data.product);
        setSelectedImages(data.product.image);
      })
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
      let images = [...product.image, ...selectedImages];

      await updateProduct(product, selectedImages, product._id, token);

      Swal.fire({
        icon: "success",
        title: "¡Producto editado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });

      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const closeModal = () => {
    closeEditModal();
  };
  console.log(product);
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
          <div className="price-formEdit">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              placeholder="$"
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

          {product && (
            <SelectCategoryProduct
              product={product.category}
              setProduct={setProduct}
            />
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
