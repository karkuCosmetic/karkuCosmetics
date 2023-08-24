import React, { useEffect, useState } from 'react';
import { getProduct } from '../../redux/Controllers/productController';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './store.css'; // Importar archivo CSS para estilos

const Store = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const dataProducts = useSelector(state => state.product.products);
  console.log (dataProducts);
  
  // Estado para el filtro
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtrar los productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'All'
    ? dataProducts
    : dataProducts.filter(product => product.category === selectedCategory);

  // Obtener todas las categorías únicas de los productos
  const allCategories = ['All', ...new Set(dataProducts.map(product => product.category))];

  return (
    <div className="store-container">
      <div className="sidebar">
        <h2>Filtro de producto</h2>
        <ul>
          {allCategories.map((category, index) => (
            <li
              key={index}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="product-container">
        {filteredProducts.map((product, index) => (
          <Link to={`/product/${product._id}`} key={index} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-description">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Store;

