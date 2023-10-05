import React, { useState, useEffect } from 'react';

function SalesManagement() {
  const [sales, setSales] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h2>Gestión de Ventas</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            Fecha: {sale.date}, Monto: {sale.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalesManagement;
