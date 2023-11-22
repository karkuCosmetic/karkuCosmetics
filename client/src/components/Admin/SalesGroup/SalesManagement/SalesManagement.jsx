import React, { useEffect, useState } from "react";
import {
  getSales,
  updateSalesById,
  updateSalesTranckingNumber,
} from "../../../../functions/fetchingSales";
import "./SalesManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";
import SelectStatusSales from "../../../SelectStatusSales/SelectStatusSales";
import Swal from "sweetalert2";

const SalesManagement = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditField, setShowEditField] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [trackNumber, setTrackNumber] = useState("");
  const [priceNumberSend, setpriceNumberSend] = useState("");
  const [isEditingCost, setIsEditingCost] = useState(false);

  const token = GetDecodedCookie("cookieToken");

  const filterSales = () => {
    return sales.filter((sale) => {
      const nameMatch =
        !nameFilter ||
        (sale.payer &&
          (sale.payer.name + " " + sale.payer.lastName)
            .toLowerCase()
            .includes(nameFilter.toLowerCase()));
      const dateMatch =
        !dateFilter ||
        (sale.methodPay &&
          sale.methodPay.datePay &&
          formatDateModal(sale.methodPay.datePay).includes(dateFilter));

      return nameMatch && dateMatch;
    });
  };

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
    setSelectedStatus(sale.detailPay.status);
  };

  const closeSaleDetailsModal = () => {
    setSelectedSale(null);
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

  const filteredSales = filterSales();

  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredSales.length / productsPerPage);
  let clampedCurrentPage = currentPage;

  if (totalPages === 0) {
    clampedCurrentPage = 1;
  } else if (clampedCurrentPage > totalPages) {
    clampedCurrentPage = totalPages;
  }

  const indexOfLastSale = clampedCurrentPage * productsPerPage;
  const indexOfFirstSale = indexOfLastSale - productsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const isNextButtonDisabled = clampedCurrentPage >= totalPages;

  const handleEditClick = () => {
    setIsEditing(true);
    setShowEditField(true);
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
    <div className="sales-container">
      <div className="back-product-btn-container">
        <button className="back-product-btn" onClick={() => setSection("Home")}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="h2-container-title-sales">
        <h2>Ventas</h2>
        <div className="filters-sales">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="DD/MM/AAAA"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="sales-list">
        {currentSales.map((sale, index) => (
          <div className="sale-container" key={index}>
            <p >
              <strong className="name-payer">Nombre: </strong>
              {sale.payer.name}
              <br />
              <strong className="name-payer">Apellido: </strong>
              {sale.payer.lastName}
            </p>

            <p className="total-buy-management">
              <strong >Total: </strong>$ {sale.methodPay?.total}
            </p>

            <p>
              <strong>Estado: </strong>
              {sale.detailPay?.status}
            </p>

            <p>
              <strong>Fecha: </strong>
              {formatDateModal(sale.methodPay?.datePay)}
            </p>
            <button
              className="btn-showSale"
              onClick={() => openSaleDetailsModal(sale)}
            >
              Ver detalle
            </button>
          </div>
        ))}
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
                      {" "}
                      <p>
                        <strong>Domicilio:</strong>{" "}
                        {selectedSale.payer?.adress?.callePrincipal}{" "}
                        {selectedSale.payer?.adress?.numero} - Piso{" "}
                        {selectedSale.payer?.adress?.piso}.{" "}
                        {selectedSale.payer?.adress?.localidad},{" "}
                        {selectedSale.payer?.adress?.provincia}.
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
      <div className="pagination-productManagement">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination-productManagement-info">
          {clampedCurrentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={isNextButtonDisabled}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default SalesManagement;
