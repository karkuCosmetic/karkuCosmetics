import { useEffect, useState } from "react";
import { getProduct } from "../../../../functions/fetchingProducts";
import "./PreviewProduct.css";

const PreviewProduct = ({ setSection }) => {
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProduct()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {};

  const handleEditProduct = (productId) => {};

  return (
    <div className="previewProduct-container">
      <h2>Productos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {showAllProducts
          ? products.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))
          : filteredProducts.slice(0, 5).map((product) => (
              <li key={product._id}>
                <img src={product.image[0]} alt={product.title} />
                {product.title} ${product.price}
                <button onClick={() => handleEditProduct(product._id)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product._id)}>
                  Eliminar
                </button>
              </li>
            ))}
      </ul>

      {!showAllProducts && (
        <button onClick={() => setSection("Product")}>Ver todos</button>
      )}
    </div>
  );
};

export default PreviewProduct;
