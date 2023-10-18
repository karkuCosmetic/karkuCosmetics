import React, { useEffect, useState } from "react";
import { getSales } from "../../../../functions/fetchingSales";
import "./SalesManagement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GetDecodedCookie } from "../../../../utils/DecodedCookie";

const SalesManagement = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  const filterSales = () => {
    return sales.filter((sale) => {
      const nameMatch =
        !nameFilter ||
        (sale.payer &&
          sale.payer.name &&
          sale.payer.name.toLowerCase().includes(nameFilter.toLowerCase()));
      const dateMatch =
        !dateFilter ||
        (sale.methodPay &&
          sale.methodPay.datePay &&
          formatDateModal(sale.methodPay.datePay).includes(dateFilter));

      return nameMatch && dateMatch;
    });
  };

  const filteredSales = filterSales();

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
            placeholder="Buscar por nombre"
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
        {filteredSales.map((sale, index) => (
          <div className="sale-container" key={index}>
            <div className="info-sale">
              <p>
                <strong>Nombre: </strong> {sale.payer && sale.payer.name}
                {sale.payer && sale.payer.lastName}
              </p>
              <p>
                <strong>Total: </strong>$
                {sale.methodPay && sale.methodPay.total}
              </p>
            </div>
            <div className="status-sale-container">
              <p>
                <strong>Estado: </strong>
                {sale.detailPay && sale.detailPay.status}
              </p>
            </div>
            <div className="btn-showSale-date-container">
              <p>
                <strong>Fecha: </strong>
                {formatDateModal(sale.methodPay && sale.methodPay.datePay)}
              </p>
              <button
                className="btn-showSale"
                onClick={() => openSaleDetailsModal(sale)}
              >
                Ver detalle
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSale && (
        <div className="modal-sales">
          <div className="modal-content-sales">
            <button
              className="back-product-btn"
              onClick={closeSaleDetailsModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Detalles de la Venta</h3>
            <p>Venta: {selectedSale.id}</p>
            <p>
              Nombre: {selectedSale.payer.name} {selectedSale.payer.lastName}
            </p>
            <div>
              <p>
                <strong>Productos:</strong>
              </p>
              {selectedSale.detailPay.items.map((el) => (
                <p>{el.title}</p>
              ))}
            </div>
            <p>Total: ${selectedSale.methodPay.total}</p>
            <p>Fecha: {formatDateModal(selectedSale.methodPay.datePay)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
