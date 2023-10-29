import React, { useEffect, useState } from "react";
import { getSales, updateSalesById } from "../../../../functions/fetchingSales";
import "./PreviewSales.css";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SelectStatusSales from "../../../SelectStatusSales/SelectStatusSales";
import Swal from "sweetalert2";

const PreviewSales = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [shippingNumber, setShippingNumber] = useState("");

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

  const updateStatus = () => {
    if (selectedSale && selectedStatus) {
      const updateValue = selectedStatus;

      updateSalesById(selectedSale.id, updateValue, token)
        .then((updatedSale) => {
          const updatedSales = sales.map((sale) =>
            sale.id === updatedSale.id ? updatedSale : sale
          );
          setSales(updatedSales);

          Swal.fire("Estado actualizado correctamente", "", "success").then(
            (result) => {
              if (result.isConfirmed) {
                closeSaleDetailsModal();
              }
            }
          );
        })
        .catch((error) => console.error("Error updating sale status:", error));
    }
  };

  const openSaleDetailsModal = (sale) => {
    setSelectedSale(sale);
    setSelectedStatus(sale.detailPay.status);
  };

  const closeSaleDetailsModal = () => {
    setSelectedSale(null);
  };
  const handleShippingNumberChange = (e) => {
    setShippingNumber(e.target.value);
  };

  const handleSaveShippingNumber = () => {
    console.log("Número de envío:", shippingNumber);
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
                Ver detalle
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
                <div className="shipping-input-container">
                  <input
                    type="text"
                    placeholder="Número de envío"
                    value={shippingNumber}
                    onChange={handleShippingNumberChange}
                  />
                  <button
                    className="btn-save-shipping"
                    onClick={handleSaveShippingNumber}
                  >
                    Guardar Envío
                  </button>
                </div>
                <div className="status-btnSave-container">
                  <p>
                    <strong>Estado:</strong>
                  </p>
                  <SelectStatusSales
                    options={["Pendiente", "En preparación", "Finalizada"]}
                    selectedOption={selectedStatus}
                    setSelectedOption={setSelectedStatus}
                  />
                  <button className="btn-save-status" onClick={updateStatus}>
                    Guardar
                  </button>
                </div>
              </div>
              <div className="detailSale-container">
                <div className="title-name-date-detailSale">
                  <div className="name-lastName-container">
                    <p>
                      <strong>Nombre y Apellido: </strong>
                      {selectedSale.payer.name} {selectedSale.payer.lastName}
                    </p>

                    <div>
                      <p>
                        <strong>Domicilio:</strong>
                        {selectedSale.payer.adress?.callePrincipal}
                        {selectedSale.payer.adress?.numero} - Piso
                        {selectedSale.payer.adress?.piso}.
                        {selectedSale.payer.adress?.localidad},
                        {selectedSale.payer.adress?.provincia}.
                      </p>
                    </div>
                  </div>
                  <div className="date-total-container">
                    <p>
                      <strong>Fecha: </strong>
                      {formatDateModal(selectedSale.methodPay.datePay)}
                    </p>
                    <p>
                      <strong>Total: </strong>$ {selectedSale.methodPay.total}
                    </p>

                    <p>
                      <strong>Tarjeta: </strong>
                      {selectedSale.methodPay.cardType}
                    </p>
                    <p>
                      <strong>Finalizada en: </strong>
                      ***{selectedSale.methodPay.last_four_digit}
                    </p>
                  </div>
                </div>
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
                      <p>x{el.quantity}</p>
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
                      <p>$ {el.unit_price}</p>
                    </div>
                  ))}
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
