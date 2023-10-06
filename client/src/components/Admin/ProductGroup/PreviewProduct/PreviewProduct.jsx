import {useEffect, useState} from 'react';
import {getProduct} from '../../../../functions/fetchingProducts';

const PreviewProduct = ({setSection}) => {
  const [products, setProducts] = useState ([]);

  useEffect (() => {
    getProduct ()
      .then (data => setProducts (data))
      .catch (error => console.error (error));
    window.scrollTo (0, 0);
  }, []);

  return (
    <div>
      <p>PreviewProduct</p>
      <button onClick={() => setSection ('Product')}>product</button>
    </div>
  );
};

export default PreviewProduct;
