import React, { useState, useEffect } from "react";
import {
  DeleteProductById,
  getProductDetail,
} from "../../../../functions/fetchingProducts";

const DeleteProduct = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const id = match.params.id;
      const productData = await getProductDetail(id);
      setProduct(productData);
    };

    fetchProductDetail();
  }, [match.params.id]);

  const handleDelete = async () => {
    if (product) {
      try {
        await DeleteProductById(product._id);
      } catch (error) {
        console.error("Error al borrar producto:", error);
      }
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <p>Confirmar Borrado de producto?</p>
          <p>Titulo: {product.title}</p>
          <p>Dimensiones: {product.dimensions}</p>
          <p>Descripción: {product.description}</p>
          <p>Precio: {product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Categoría: {product.category}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default DeleteProduct;
