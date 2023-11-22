import React, { useEffect, useState } from "react";
import {
  getSales,
  updateSalesById,
  updateSalesTranckingNumber,
} from "../../../../functions/fetchingSales";
import "./PreviewSales.css";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import SelectStatusSales from "../../../SelectStatusSales/SelectStatusSales";
import Swal from "sweetalert2";

const PreviewSales = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [trackNumber, setTrackNumber] = useState("");
  const [priceNumberSend, setpriceNumberSend] = useState("");
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [isEditingCost, setIsEditingCost] = useState(false);

  const orderSales = sales.slice(0, 5);
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
    setTrackNumber(e.target.value);
  };

  const handlepriceNumberSendChange = (e) => {
    setpriceNumberSend(e.target.value);
  };

  const handleSaveShippingNumber = () => {
    updateSalesTranckingNumber(
      selectedSale.id,
      token,
      trackNumber,
      priceNumberSend
    )
      .then(() => {
        Swal.fire("Guardado correctamente", "", "success");
        setIsEditingNumber(false);
      })
      .catch((error) => {
        console.error("Error al guardar:", error);
        Swal.fire("Error al guardar", "", "error");
      });
  };

  const handleEditNumberClick = () => {
    setIsEditingNumber(true);
  };

  const handleEditCostClick = () => {
    setIsEditingCost(true);
  };

  const handleSavepriceNumberSend = () => {
    updateSalesTranckingNumber(
      selectedSale.id,
      token,
      trackNumber,
      priceNumberSend
    )
      .then(() => {
        Swal.fire("Guardado correctamente", "", "success");
        setIsEditingCost(false);
      })
      .catch((error) => {
        console.error("Error al guardar:", error);
        Swal.fire("Error al guardar", "", "error");
      });
  };

  const handleCancelEditNumber = () => {
    setIsEditingNumber(false);
  };

  const handleCancelEditCost = () => {
    setIsEditingCost(false);
  };

  return (
    <div className="sales-preview-container">
      <h2>Ventas</h2>
      <div className="sales-list">
        {orderSales.map((sale, index) => (
          <div className="sale-container" key={index}>
            <div className="info-sale-preview">
              <p>
                {sale.payer.name} {sale.payer.lastName}
              </p>
              <p className="total-buy-preview">
                <strong>Total: </strong>${sale.methodPay.total}
              </p>
              <p>
                <strong>Estado: </strong> {sale.detailPay.status}
              </p>
              <p>
                <strong>Fecha: </strong>{" "}
                {formatDateModal(sale.methodPay.datePay)}
              </p>
            </div>
            <div className="btn-showSale-container">
              <button
                className="btn-showSale-preview"
                onClick={() => openSaleDetailsModal(sale)}
              >
                Ver venta
              </button>
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
                    <div className="tn-cost-shipping">
                      <div className="tn-shipping">
                        <p>
                          <strong>TN: </strong>
                          {selectedSale.detailPay?.TrackNumber}
                        </p>
                        {isEditingNumber ? (
                          <>
                            <input
                              type="text"
                              placeholder="Número de envío"
                              value={trackNumber}
                              onChange={handleShippingNumberChange}
                            />
                            <button
                              className="btn-save-shipping"
                              onClick={handleSaveShippingNumber}
                            >
                              Guardar Envío
                            </button>
                            <button
                              className="btn-cancel-edit"
                              onClick={handleCancelEditNumber}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <FontAwesomeIcon
                            className="icon-edit-shipping"
                            icon={faPen}
                            onClick={handleEditNumberClick}
                          />
                        )}
                      </div>
                      <div className="cost-shipping">
                        <p>
                          <strong>Envío: </strong>
                          {selectedSale.detailPay?.shipStatus
                            ? "Pagado"
                            : "Pendiente de pago"}{" "}
                          - $ {selectedSale.detailPay?.shipPrice}
                        </p>
                        {isEditingCost ? (
                          <>
                            <input
                              type="number"
                              placeholder="Costo de envío"
                              value={priceNumberSend}
                              onChange={handlepriceNumberSendChange}
                            />
                            <button
                              className="btn-save-shipping"
                              onClick={handleSavepriceNumberSend}
                            >
                              Guardar Costo
                            </button>
                            <button
                              className="btn-cancel-edit"
                              onClick={handleCancelEditCost}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <FontAwesomeIcon
                            className="icon-edit-shipping"
                            icon={faPen}
                            onClick={handleEditCostClick}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="date-total-container">
                    <p>
                      <strong>Fecha: </strong>
                      {formatDateModal(selectedSale.methodPay.datePay)}
                    </p>
                    <p>
                      <strong>Total: </strong>${selectedSale.methodPay.total}
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
