import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getProductDetail} from '../../functions/fetchingProducts';

export const DetailPage = () => {
  const [detailProduct, SetDetailProduct] = useState ({});
  const {id} = useParams ();

  useEffect (
    () => {
      CallProductsDetail ();
    },
    [id]
  );

  const CallProductsDetail = async () => {
    const data = await getProductDetail (id);
    SetDetailProduct (data.product);
  };
  return (
    <div>

      <p>
        {detailProduct.title}
      </p>
      <p>
        {detailProduct.description}
      </p>
      <p>
        {detailProduct.dimensions}
      </p>
      <p>
        ${detailProduct.price}
      </p>

    </div>
  );
};

export default DetailPage;
