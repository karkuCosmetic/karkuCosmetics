import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../functions/fetchingProducts";
import "./detailPage.css";
import Navbar from "../../components/NavBar/navbar";

export const DetailPage = () => {
  const [detailProduct, setDetailProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
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
    // Lógica para agregar al carrito
    console.log(`Agregado al carrito: ${quantity} x ${detailProduct.title}`);
  };

  return (
    <>
      <Navbar />
      <div className="detailProduct">
        <div className="detail-container">
          <div className="detail-image">
            <img src={detailProduct.image} alt={detailProduct.title} />
          </div>
          <div className="detail-info">
            <p className="detail-title">
              {detailProduct.title &&
                detailProduct.title.charAt(0).toUpperCase() +
                  detailProduct.title.slice(1)}
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
        </div>
        <p className="detail-description">
          {detailProduct.description &&
            detailProduct.description.charAt(0).toUpperCase() +
              detailProduct.description.slice(1)}
        </p>

        <div className="image-grid">
          <img src={detailProduct.image} alt={detailProduct.title} />
          <img src={detailProduct.image} alt={detailProduct.title} />
          <img src={detailProduct.image} alt={detailProduct.title} />
          <img src={detailProduct.image} alt={detailProduct.title} />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
