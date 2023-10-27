import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingPage.css";

const ShippingPage = ({ location }) => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    method: "acordar-con-vendedor",
    address: "",
  });

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handlePayment = () => {
    location.state.handlePayment(shippingInfo);
    navigate("/payment");
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
                value={shippingInfo.calle}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, calle: e.target.value })
                }
              />
            </label>
            <label className="shipping-form-label">
              Numero:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.numero}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, numero: e.target.value })
                }
              />
            </label>
            <label className="shipping-form-label">
              Piso:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.piso}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, piso: e.target.value })
                }
              />
            </label>
            <label className="shipping-form-label">
              Entre Calles:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.entreCalles}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    entreCalles: e.target.value,
                  })
                }
              />
            </label>
            <label className="shipping-form-label">
              Localidad:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.localidad}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    localidad: e.target.value,
                  })
                }
              />
            </label>
            <label className="shipping-form-label">
              Código Postal:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.codigoPostal}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    codigoPostal: e.target.value,
                  })
                }
              />
            </label>
            <label className="shipping-form-label">
              Provincia:
              <input
                className="shipping-input"
                type="text"
                value={shippingInfo.provincia}
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    provincia: e.target.value,
                  })
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
