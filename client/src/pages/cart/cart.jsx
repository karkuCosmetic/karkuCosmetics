import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/navbar";
import "./cart.css";

export const Cart = () => {
  // const [cart,SetCart]=useState(JSON.parse(localStorage.getItem("cart")) || [])
  const [cart, SetCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>
                {item.product.title} x {item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
