import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductDetail } from "../../functions/fetchingProducts";
import "./DetailPage.css";
import Navbar from "../../components/NavBar/navbar";
import { AddCart } from "../../utils/addCart";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const DetailPage = () => {
  const [detailProduct, setDetailProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [imageIndex, setImageIndex] = useState(0);
  const { id } = useParams();
  const token = GetDecodedCookie("cookieToken");
  const navigate = useNavigate();

  useEffect(() => {
    callProductDetail(id);

    window.scrollTo(0, 0);
  }, [id]);

  const callProductDetail = async (id) => {
    const data = await getProductDetail(id);
    setDetailProduct(data.product);
  };

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const addToCart = () => {
    if (token) {
      AddCart(quantity, detailProduct);
      setQuantity(1);
      showAddToCartAlert();
    } else {
      console.log("Necesitas loguearte");
    }
  };

  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    if (imageIndex > 0) {
      openImageModal(detailProduct.image[imageIndex - 1], imageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (imageIndex < detailProduct.image.length - 1) {
      openImageModal(detailProduct.image[imageIndex + 1], imageIndex + 1);
    }
  };

  const showAddToCartAlert = () => {
    Swal.fire({
      position: "top",
      title: "Producto agregado a carrito",
      showConfirmButton: false,
      timer: 1000,
      width: 250,
      background: "green",
      customClass: {
        title: "swal-title",
        container: "swal-container",
        content: "swal-content",
      },
    });
  };

  const goBackToStore = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <div className="detailProduct">
        <div className="btn-back-container">
          <button className="go-back-btn-detail" onClick={goBackToStore}>
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} /> Atrás
          </button>
        </div>
        <div className="detail-container">
          <div className="detail-image">
            <img
              src={detailProduct.image && detailProduct.image[0]}
              alt={detailProduct.title}
              onClick={() => openImageModal(detailProduct.image[0], 0)}
            />
            <div className="image-grid">
              {detailProduct.image &&
                detailProduct.image
                  .slice(1)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      onClick={() => openImageModal(image, index + 1)}
                    />
                  ))}
            </div>
            {selectedImage && (
              <div className="image-modal-overlay">
                <div className="image-modal">
                  <div className="image-modal-nav">
                    <button
                      className="prev-image-button"
                      onClick={handlePrevImage}
                      disabled={imageIndex === 0}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <img src={selectedImage} alt="Expanded" />
                    <button
                      className="next-image-button"
                      onClick={handleNextImage}
                      disabled={imageIndex === detailProduct.image.length - 1}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  <button
                    className="close-modal-button"
                    onClick={closeImageModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="detail-info">
            <p className="detail-title">
              {detailProduct.title && detailProduct.title}
            </p>
            <p className="detail-dimensions">
              {detailProduct.dimensions &&
                detailProduct.dimensions.charAt(0).toUpperCase() +
                  detailProduct.dimensions.slice(1)}
            </p>
            <p className="detail-price">${detailProduct.price}</p>

            <div className="price-buy-detail">
              <button className="detail-buy-button">Comprar</button>
            </div>
            <div className="detail-quantity">
              <div className="quantity-buttons-container-detail">
                <button
                  className="quantity-button-detail"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="quantity-detail">{quantity}</span>
                <button
                  className="quantity-button-detail"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <button className="add-to-cart-button" onClick={addToCart}>
                Agregar al carrito
              </button>
            </div>
          </div>
          <div>
            <p className="detail-description">
              {detailProduct.description &&
                detailProduct.description.charAt(0).toUpperCase() +
                  detailProduct.description.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
