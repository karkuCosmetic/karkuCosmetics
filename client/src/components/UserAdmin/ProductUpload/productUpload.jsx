import React, { useState, useEffect, useCallback } from "react";
import { fileUpload } from "../../../utils/fileUpload";
import { updateProduct } from "../../../functions/fetchingProducts";
import "./productUpload.css";

const ProductUpload = () => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(null);

  const handleImageUpload = useCallback((event) => {
    const selectedFiles = event.target.files;
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  }, []);

  const handlerSubmitImage = useCallback(async () => {
    const uploadedImages = await fileUpload(images, "products");
    setImageUrls(uploadedImages);
    updateProduct(uploadedImages);
  }, [images]);

  useEffect(() => {
    if (images.length > 0) {
      document.querySelector(".upload-button").removeAttribute("disabled");
    } else {
      document.querySelector(".upload-button").setAttribute("disabled", true);
    }
  }, [images]);

  return (
    <div className="product-upload-container">
      <input
        className="upload-input"
        type="file"
        name=""
        id=""
        onChange={handleImageUpload}
        multiple
      />
      <div className="selected-images">
        {images.map((image, index) => (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected Image ${index}`}
            className="selected-image"
          />
        ))}
      </div>
      {imageUrls && (
        <div className="previously-uploaded-images">
          {imageUrls.map((url, index) => (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              key={index}
              src={url}
              alt={`Uploaded Image ${index}`}
              className="previously-uploaded-image"
            />
          ))}
        </div>
      )}

      <button
        onClick={handlerSubmitImage}
        className="upload-button"
        disabled={!images.length}
      >
        Subir foto
      </button>
    </div>
  );
};
export default ProductUpload;
