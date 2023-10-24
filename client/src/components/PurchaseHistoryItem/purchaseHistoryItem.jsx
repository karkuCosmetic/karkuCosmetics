import React from "react";
import "./purchaseHistoryItem.css";
const PurchaseHistoryItem = ({ purchase }) => {
  const formatDateModal = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="purchase-item">
      <div className="purchase-total">
        <p>
          <strong>Fecha: </strong>
          {formatDateModal(purchase.methodPay.datePay)}
        </p>
        <p className="total-purchase-p">
          <strong>Total: $</strong> {purchase.methodPay.total}
        </p>
        <p>
          <strong>Estado: </strong>
          {purchase.detailPay.status}
        </p>
      </div>
      {purchase.detailPay.items.map((item, index) => (
        <div className="purchase-item-details" key={index}>
          <img src={item.picture_url} alt={item.title} className="item-image" />
          <div className="item-title">{item.title}</div>
          <div> x{item.quantity}</div>
          <div> ${item.unit_price}</div>
        </div>
      ))}
    </div>
  );
};
export default PurchaseHistoryItem;
