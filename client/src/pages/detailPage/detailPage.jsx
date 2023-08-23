import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProductDetail} from '../../redux/Controllers/productController';

export const DetailPage = () => {
  const {id} = useParams ();

  const dispatch = useDispatch ();

  useEffect (
    () => {
      dispatch (getProductDetail (id));
    },
    [id, dispatch]
  );
  const detail = useSelector (state => state.product.productDetail.product);
  console.log(detail);
  return (
    <div>

      <p>
        {detail.title}
      </p>
      <p>
        {detail.description}
      </p>
      <p>
        {detail.dimensions}
      </p>
      <p>
        ${detail.price}
      </p>

    </div>
  );
};

export default DetailPage;
