import React, { useState } from "react";
export const Cart = () => {

  // const [cart,SetCart]=useState(JSON.parse(localStorage.getItem("cart")) || [])
  const [cart,SetCart]=useState(JSON.parse(localStorage.getItem("cart")) || [])
  
console.log(cart);

    return (
      <div>
        <p>cart</p>
      </div>
    );
  };
  
  export default Cart;
  