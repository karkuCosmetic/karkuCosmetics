import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/navbar";
import "./Cart.css";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom"; // Importa Link en lugar de Navigate
import Swal from "sweetalert2";
import { GetDecodedCookie } from "../../utils/DecodedCookie";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const token = GetDecodedCookie("cookieToken");

  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += change;
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }
    setCart(updatedCart);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const handleContinueToCheckout = () => {   
    if (token) {
      window.location.href = "/shipping";
    } else {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para continuar con la compra.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
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
          {cart[0] ? (
            <>
              <button className="empty-cart-button" onClick={handleEmptyCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            ""
          )}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="img-title-container">
                  <div className="item-image-title">
                    <img
                      className="image-cart"
                      src={
                        item.product &&
                        item.product.image &&
                        item.product.image[0]
                      }
                      alt={item.product && item.product.title}
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
                          disabled={product.quantity >= 10}
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
          
          {cart[0]?
          <Link to="#" className="btn-buy" onClick={handleContinueToCheckout} >
            Continuar compra
          </Link>
         :"" }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
