import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./store.css";
import Navbar from "../../components/NavBar/navbar";
import { getProduct } from "../../functions/fetchingProducts";

const Store = () => {
  const [dataProducts, SetDataProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para productos filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [productsPerPage] = useState(10);

  useEffect(() => {
    CallProducts();
  }, []);

  const CallProducts = async () => {
    const data = await getProduct();
    SetDataProducts(data);
  };

  // Filtro por precio
  const handlePriceFilter = () => {
    const filteredByPrice = dataProducts.filter((product) => {
      const productPrice = product.price;
      return (
        (minPrice === "" || productPrice >= parseFloat(minPrice)) &&
        (maxPrice === "" || productPrice <= parseFloat(maxPrice))
      );
    });

    setFilteredProducts(filteredByPrice);
    setCurrentPage(1); // Actualizar productos filtrados aquí
  };

  // Estado para el filtro
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtrar los productos según la categoría seleccionada
  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? dataProducts
      : dataProducts.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    // Actualizar productos filtrados también cuando cambie la categoría
    setFilteredProducts(filteredProductsByCategory);
    setCurrentPage(1);
  }, [filteredProductsByCategory, selectedCategory]);

  // Obtener todas las categorías únicas de los productos
  const TodosCategories = [
    "Todos",
    ...new Set(dataProducts.map((product) => product.category)),
  ];

  // Obtener índices de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="navbar-store">
        <Navbar />
      </div>
      <div className="store-container">
        <div className="sidebar">
          <h2>Productos</h2>
          <ul>
            {TodosCategories.map((category, index) => (
              <li
                key={index}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <div className="price-filter">
            <h3>Rango de Precios</h3>
            <input
              type="number"
              placeholder="Precio Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handlePriceFilter}>Filtrar</button>
          </div>
        </div>

        <div className="product-container">
          {currentProducts.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={index}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          className="arrow-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {filteredProducts.length > productsPerPage &&
          Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        <button
          className="arrow-button"
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage >= Math.ceil(filteredProducts.length / productsPerPage)
          }
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Store;
