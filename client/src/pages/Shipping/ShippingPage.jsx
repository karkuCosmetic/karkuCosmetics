import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingPage.css";

import { Payment } from "../../functions/payment";
import { useEffect } from "react";

import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { getUserDetail } from "../../functions/fetchingUsers";
import { DecodedToken } from "../../utils/DecodedToken";

const ShippingPage = ({ location }) => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    //info que se actualiza
    method: "acordar-con-vendedor",
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

  const [AdressCurrent, setAdressCurrent] = useState({}); //mapear info ya cargada en la base

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
      console.log("debes loguearte");
    }
  };
  return (
    <div className="shipping">
      <div className="shipping-container">
        <h2 className="shipping-title">Seleccionar Envío</h2>
        <label className="shipping-form-label">
          Método de Envío:
          <select
            className="shipping-select"
            value={shippingInfo.method}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, method: e.target.value })
            }
          >
            <option value="acordar-con-vendedor">
              Acordar con el vendedor
            </option>
            <option value="envio-por-correo">Envío por correo</option>
          </select>
        </label>

        {shippingInfo.method === "envio-por-correo" && (
          <div>
            <label className="shipping-form-label">
              Calle:
              <input
                className="shipping-input"
                type="text"
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
                type="text"
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
                type="text"
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
              Entre Calles:
              <input
                className="shipping-input"
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
        )}

        <div className="shipping-buttons">
          <button className="shipping-button" onClick={handleBackToCart}>
            Volver al Carrito
          </button>
          <button className="shipping-button" onClick={handlePayment}>
            Ir a Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
