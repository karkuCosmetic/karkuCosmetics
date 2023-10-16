import React from 'react';
import './purchaseHistoryItem.css';
const PurchaseHistoryItem = ({purchase}) => {
  const formatDateModal = isoDate => {
    const date = new Date (isoDate);
    const day = String (date.getDate ()).padStart (2, '0');
    const month = String (date.getMonth () + 1).padStart (2, '0');
    const year = date.getFullYear ();
    return `${day}/${month}/${year}`;
  };

  const calculateTotal = () => {
    if (!purchase.methodPay.total) {
      let total = 0;
      for (const item of purchase.detailPay.items) {
        total += item.unit_price * item.quantity;
      }
      return total > 0 ? `$${total}` : '';
    }
    return '';
  };

  return (
    <div className="purchase-item">
      <div className="purchase-total">
        <h4 className="date-purchase">
          {formatDateModal (purchase.methodPay.datePay)} -
        </h4>
        {purchase.methodPay.total && `Total: $${purchase.methodPay.total}`}
        {!purchase.methodPay.total && `Total: ${calculateTotal ()} `}
        <div>- {purchase.detailPay.status}</div>
      </div>
      {purchase.detailPay.items.map ((item, index) => (
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
