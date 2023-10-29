import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/navbar";
import "./ShippingPage.css";
import { Payment } from "../../functions/payment";
import { useEffect } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { getUserDetail } from "../../functions/fetchingUsers";
import { DecodedToken } from "../../utils/DecodedToken";
import SelectShipping from "../../components/SelectShipping/SelectShipping";

const ShippingPage = ({ location }) => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    method: "Acordar con vendedor",
    adress: {
      calle: "",
      numero: "",
      piso: "",
      entreCalles: "",
      localidad: "",
      codigoPostal: "",
      provincia: "",
    },
  });

  const [AdressCurrent, setAdressCurrent] = useState({});
  const [newAddressFormVisible, setNewAddressFormVisible] = useState(false);

  const token = GetDecodedCookie("cookieToken");

  useEffect(() => {
    if (token) {
      let { value } = DecodedToken(token);
      callUserDetail(value);
    }
  }, [token]);

  const callUserDetail = async (uid) => {
    await getUserDetail(uid, token).then((data) => {
      setAdressCurrent(data.adress);
    });
  };

  const [cart, SetCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handlePayment = () => {
    if (token) {
      Payment(cart, token, shippingInfo);
    } else {
      console.log("Debes iniciar sesión");
    }
  };

  const handleMethodChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      method: e.target.value,
    });
    if (e.target.value !== "envio-por-correo") {
      setNewAddressFormVisible(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="shipping">
        <div className="cart-preview">
          <h3 className="h3-shippingPage">Resumen del Carrito</h3>
          <div className="cart-item-shippingPage">
            <div>
              <p>
                <strong>Productos total:</strong> x
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </p>
            </div>
            <div>
              <p>
                <strong>Compra Total:</strong> $
                {cart
                  .reduce(
                    (total, item) => total + item.quantity * item.product.price,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="shipping-container">
          <h2 className="shipping-title">Seleccionar Envío</h2>
          <label className="shipping-form-label">
            <h4>Método de envío:</h4>
            <SelectShipping
              options={["Acordar con vendedor", "Envío por correo"]}
              selectedOption={shippingInfo.method}
              setSelectedOption={(option) =>
                setShippingInfo({ ...shippingInfo, method: option })
              }
            />
          </label>

          {shippingInfo.method === "Envío por correo" && (
            <>
              {AdressCurrent && Object.keys(AdressCurrent).length > 0 ? (
                <div className="shipping-address-card">
                  <h4>Dirección de envío:</h4>
                  {AdressCurrent.callePrincipal} {AdressCurrent.numero} - Piso{" "}
                  {AdressCurrent.piso}. {AdressCurrent.localidad},{" "}
                  {AdressCurrent.provincia}.
                </div>
              ) : (
                <p>No hay dirección de usuario disponible.</p>
              )}
            </>
          )}
          <div className="shipping-form">
            {newAddressFormVisible &&
            shippingInfo.method === "Envío por correo" ? (
              <form className="newAdress-form">
                <div>
                  <label className="shipping-form-label">
                    <p>Calle:</p>
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.calle}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            calle: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    Numero:
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.numero}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            numero: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    Piso:
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.piso}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            piso: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    <p>Entre Calles:</p>
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.entreCalles}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            entreCalles: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    Localidad:
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.localidad}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            localidad: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    Código Postal:
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.codigoPostal}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            codigoPostal: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                  <label className="shipping-form-label">
                    Provincia:
                    <input
                      className="shipping-input"
                      value={shippingInfo.adress.provincia}
                      onChange={(e) =>
                        setShippingInfo((prevInfo) => ({
                          ...prevInfo,
                          adress: {
                            ...prevInfo.adress,
                            provincia: e.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                </div>
              </form>
            ) : (
              shippingInfo.method === "Envío por correo" && (
                <button
                  className="newAdress-btn"
                  onClick={() => setNewAddressFormVisible(true)}
                >
                  Nueva dirección
                </button>
              )
            )}
          </div>
        </div>

        <div className="shipping-buttons">
          <button className="shipping-button" onClick={handleBackToCart}>
            Volver al Carrito
          </button>
          <button className="shipping-button" onClick={handlePayment}>
            Ir a Pagar
          </button>
        </div>
      </div>
    </>
  );
};

export default ShippingPage;
