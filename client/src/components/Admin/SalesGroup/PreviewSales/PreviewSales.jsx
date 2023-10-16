import React, { useEffect, useState } from "react";
import { getSales } from "../../../../functions/fetchingSales";
import "./PreviewSales.css";

const PreviewSales = ({ setSection }) => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  const orderSales = sales.slice(0, 5);

  useEffect(() => {
    getSales()
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
                Nombre: {sale.payer.name} {sale.payer.lastName}
              </p>
              <p>Total: ${sale.methodPay.total}</p>
              <p>Producto:{sale.detailPay.items.title}</p>
              <p>Fecha: {formatDateModal(sale.methodPay.datePay)}</p>
            </div>
            <div className="btn-showSale">
              <button onClick={() => openSaleDetailsModal(sale)}>
                Ver venta
              </button>
              <p>Estado: {sale.detailPay.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-showAllSales">
        <button className="button-showAll" onClick={() => setSection("Sales")}>
          Ver más ventas
        </button>
      </div>
      {selectedSale && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeSaleDetailsModal}>Cerrar</button>
            <h3>Detalles de la Venta</h3>
            <p>Venta: {selectedSale.id}</p>
            <p>
              Nombre: {selectedSale.payer.name} {selectedSale.payer.lastName}
            </p>
            <p>Total: ${selectedSale.methodPay.total}</p>
            <p>Fecha: {formatDateModal(selectedSale.methodPay.datePay)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewSales;
