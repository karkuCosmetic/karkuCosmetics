import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../functions/fetchingProducts";
import "./detailPage.css";
import Navbar from "../../components/NavBar/navbar";
import { AddCart } from "../../utils/addCart";

export const DetailPage = () => {
  const [detailProduct, setDetailProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    callProductDetail(id);
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
    AddCart(quantity,detailProduct) 
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };


  return (
    <>
      <Navbar />
      <div className="detailProduct">
        <div className="detail-container">
          <div className="detail-image">
            <img src={detailProduct.image && detailProduct.image[0]} alt={detailProduct.title} />
          </div>
          <div className="detail-info">
            <p className="detail-title">
              {detailProduct.title &&
                detailProduct.title}
            </p>
            <p className="detail-dimensions">
              {detailProduct.dimensions &&
                detailProduct.dimensions.charAt(0).toUpperCase() +
                  detailProduct.dimensions.slice(1)}
            </p>
            <p className="detail-price">${detailProduct.price}</p>
            <button className="detail-buy-button">Comprar</button>
            <div className="detail-quantity">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            <button className="add-to-cart-button" onClick={addToCart}>
              Agregar al carrito
            </button>
          </div>
          <p className="detail-description">
            {detailProduct.description &&
              detailProduct.description.charAt(0).toUpperCase() +
                detailProduct.description.slice(1)}
          </p>

          <div className="image-grid">
            {detailProduct.image && detailProduct.image.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => openImageModal(image)}
                />
              ))}
          </div>
          {selectedImage && (
            <div className="image-modal-overlay">
              <div className="image-modal">
                <img src={selectedImage} alt="Expanded" />
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
      </div>
    </>
  );
};

export default DetailPage;
