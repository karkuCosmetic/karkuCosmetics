import React, { useState, useEffect } from 'react';

function SalesManagement({setSection}) {
  const [sales, setSales] = useState([]);

  useEffect(() => {

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
