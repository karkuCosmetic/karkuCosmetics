import React, { useEffect, useState } from "react";
import { getSales } from "../../../../functions/fetchingSales";
import "./PreviewSales.css";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PreviewSales = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  const orderSales = sales.slice(0, 6);
  const token = GetDecodedCookie("cookieToken");
  useEffect(() => {
    getSales(token)
      .then((data) => setSales(data.orders.reverse()))
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  const formatDateModal = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openSaleDetailsModal = (sale) => {
    setSelectedSale(sale);
  };

  const closeSaleDetailsModal = () => {
    setSelectedSale(null);
  };

  return (
    <div className="sales-preview-container">
      <h2>Ventas</h2>
      <div className="sales-list">
        {orderSales.map((sale, index) => (
          <div className="sale-container" key={index}>
            <div className="info-sale-preview">
              <p>
                <strong>Nombre: </strong> {sale.payer.name}{" "}
                {sale.payer.lastName}
              </p>
              <p>
                <strong>Total: </strong>${sale.methodPay.total}
              </p>
              <p>
                <strong>Estado: </strong> {sale.detailPay.status}
              </p>
            </div>
            <div className="btn-showSale-container">
              <button
                className="btn-showSale"
                onClick={() => openSaleDetailsModal(sale)}
              >
                Vista rápida
              </button>
              <p>
                <strong>Fecha: </strong>{" "}
                {formatDateModal(sale.methodPay.datePay)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-showAllSales">
        <button
          className="btn-showAll-preview"
          onClick={() => setSection("Sales")}
        >
          Ver más ventas
        </button>
      </div>
      {selectedSale && (
        <div className="modal-previewSales">
          <div className="modal-previewSales-content">
            <div className="close-previewSales-modal-container">
              <button
                className="back-previewSale-btn"
                onClick={closeSaleDetailsModal}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="detail-sale-container">
              <div className="saleId-status-container">
                <p>
                  <strong>Venta N° :</strong> {selectedSale.id}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedSale.detailPay.status}
                </p>
              </div>
              <div className="detailSale-container">
                <div className="title-name-date-detailSale">
                  <div className="date-total-container">
                    <p>
                      <strong>Fecha: </strong>
                      {formatDateModal(selectedSale.methodPay.datePay)}
                    </p>
                    <p>
                      <strong>Total: </strong> ${selectedSale.methodPay.total}
                    </p>
                  </div>
                  <div className="name-lastName-container">
                    <p>
                      <strong>Nombre y Apellido: </strong>
                      {selectedSale.payer.name} {selectedSale.payer.lastName}
                    </p>
                  </div>
                </div>
                <div className="products-full-container">
                  <div className="products-totalPay-detailSale">
                    <div className="detail-product-sale">
                      <div className="product-header">
                        <strong>Producto/s: </strong>
                      </div>
                      {selectedSale.detailPay.items.map((el, index) => (
                        <div className="product">
                          <p>{el.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="products-totalPay-detailSale">
                    <div className="detail-product-sale">
                      <div className="product-header">
                        <strong>Cantidad: </strong>
                      </div>
                      {selectedSale.detailPay.items.map((el, index) => (
                        <div className="product">
                          <p>{el.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="products-totalPay-detailSale">
                    <div className="detail-product-sale">
                      <div className="product-header">
                        <strong>Precio unitario: </strong>
                      </div>
                      {selectedSale.detailPay.items.map((el, index) => (
                        <div className="product">
                          <p>{el.unit_price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewSales;
