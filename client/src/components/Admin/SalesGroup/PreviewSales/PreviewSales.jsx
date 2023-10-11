import {useEffect, useState} from 'react';
import {getSales} from '../../../../functions/fetchingSales';

const PreviewSales = ({setSection}) => {
  const [sales, setSales] = useState ([]);

  useEffect (() => {
    getSales ().then (data => setSales (data.orders));
  }, []);

  return (
    <div>
      <p>PreviewSales</p>
      <button onClick={() => setSection ('Sales')}>Sales</button>
    </div>
  );
};
export default PreviewSales;
