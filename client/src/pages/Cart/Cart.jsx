import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/navbar";
import "./Cart.css";
import { Payment } from "../../functions/payment";
import Footer from "../../components/Footer/footer";
import { GetDecodedCookie } from "../../utils/DecodedCookie";


export const Cart = () => {
  const token = GetDecodedCookie("cookieToken");

  const [cart, SetCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }
    SetCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    SetCart(updatedCart);
  };

  const handleEmptyCart = () => {
    SetCart([]);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const handlePayment = () => {
    if (token) {
      Payment(cart);
    } else {
      console.log("debes loguearte");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <Navbar />
      <div className="cart-full">
        <div className="cart-container">
        <button className="empty-cart-button" onClick={handleEmptyCart}>
            Vaciar Carrito
          </button>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="img-title-container">
                  <div className="item-image-title">
                    <img
                      className="image-cart"
                      src={item.product.image[0]}
                      alt={item.product.title}
                    />
                    <div className="product-info-cart">
                      <p className="title-cart">{item.product.title}</p>
                    </div>
                  </div>
                </div>
                <div className="cart-item-body">
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Borrar
                  </button>
                  <div className="quantity-control">
                    <button
                      className="quantity-button-less"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-cart">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="p-total-price">
                    <p className="total">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-summary">
          <p className="total-label">Total:</p>
          <p className="total-amount">${calculateTotal().toFixed(2)}</p>
          <button className="checkout-button" onClick={handlePayment}>
            Ir a Pagar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
