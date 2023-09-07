import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Navbar from '../../components/NavBar/navbar';
import './cart.css';
import {Payment} from '../../functions/payment';
import Footer from '../../components/Footer/footer';

export const Cart = () => {
  const [cart, SetCart] = useState (
    JSON.parse (localStorage.getItem ('cart')) || []
  );

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }
    SetCart (updatedCart);
  };

  const handleRemoveItem = index => {
    const updatedCart = [...cart];
    updatedCart.splice (index, 1);
    SetCart (updatedCart);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach (item => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const handlePayment = () => {
    Payment (cart);
  };

  useEffect (
    () => {
      localStorage.setItem ('cart', JSON.stringify (cart));
    },
    [cart]
  );

  return (
    <div>
      <Navbar />
      <div className="cart-full">
        <div className="cart-container">
          <h2>Carrito de Productos</h2>
          <div className="cart-items">
            {cart.map ((item, index) => (
              <div key={index} className="cart-item">
                <div className="product-info">
                  <img src={item.product.image[0]} alt={item.product.title} />
                  <div>
                    <p>{item.product.title}</p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem (index)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className="quantity-control">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange (index, -1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange (index, 1)}
                  >
                    +
                  </button>
                </div>
                <p className="price">${item.product.price}</p>
                <p className="total">
                  ${(item.product.price * item.quantity).toFixed (2)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-summary">
          <p className="total-label">Total:</p>
          <p className="total-amount">${calculateTotal ().toFixed (2)}</p>
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
