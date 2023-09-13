// ProductManagement.js
import React, { useState, useEffect } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {

  }, []);

  const handleAddProduct = () => {

  };

  const handleDeleteProduct = (productId) => {

  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}{' '}
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nombre del nuevo producto"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={handleAddProduct}>Agregar Producto</button>
    </div>
  );
}

export default ProductManagement;
