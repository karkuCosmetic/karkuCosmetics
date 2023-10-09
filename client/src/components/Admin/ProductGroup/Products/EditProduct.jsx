import React, {useState, useEffect} from 'react';
import {
  getProductDetail,
  updateProduct,
} from '../../../../functions/fetchingProducts';
import './EditProduct.css';

const EditProduct = ({match}) => {
  const [product, setProduct] = useState ({});

  const id = match.params.id;

  useEffect (() => {
    fetchingdetail ().then (data => setProduct (data.product)).catch ('error');
  }, []);

  const fetchingdetail = async () => {
    const data = await getProductDetail (id);
    return data;
  };

  const handleInputChange = e => {
    const {name, value} = e.target;
    setProduct ({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault ();

    try {
      await updateProduct (product, product._id);
    } catch (error) {
      console.error ('Error al actualizar el producto:', error);
    }
  };

  return (
    <div className="form-updateProduct">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Dimensiones:</label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProduct;
