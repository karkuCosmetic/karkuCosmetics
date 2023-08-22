import React, {useEffect} from 'react';
import {getProduct} from '../../redux/Controllers/productController';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const Store = () => {
  const dispatch = useDispatch ();

  useEffect (
    () => {
      dispatch (getProduct ());
    },
    [dispatch]
  );
  const dataProducts = useSelector (state => state.product.products);
  console.log (dataProducts);
  return (
    <div>
      {dataProducts.map ((el, index) => (
        <Link to={`/product/${el._id}`} key={index}>

          <div>
            <p>
              {el.title}
            </p>
            <p>
              {el.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Store;
