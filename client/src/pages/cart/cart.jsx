import axios from 'axios';
import React, {useEffect, useState} from 'react';
export const Cart = () => {
  // const [cart,SetCart]=useState(JSON.parse(localStorage.getItem("cart")) || [])
  const [cart, SetCart] = useState (
    JSON.parse (localStorage.getItem ('cart')) || []
  );

  return (
    <div>
      {cart.map ((el, index) => (
        <div key={index}>
          <p>{el.product.title} x {el.quantity}</p>
        </div>
      ))}

    </div>
  );
};

export default Cart;
