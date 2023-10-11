import React, { useState, useEffect } from 'react';
import { getSales } from '../../../../functions/fetchingSales';

function SalesManagement({setSection}) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales ().then (data => setSales (data.orders));
  }, []);

  return (
    <div>
      <h2>Gestión de Ventas</h2>
      <button onClick={()=>setSection("Home")}>Home</button>
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
