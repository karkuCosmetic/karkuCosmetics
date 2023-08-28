import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./store.css";
import Navbar from "../../components/NavBar/navbar";
import { getProduct } from "../../functions/fetchingProducts";

const Store = () => {
  const [dataProducts, SetDataProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

    return filteredByPrice;
  };

  // Estado para el filtro
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtrar los productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === "Todos"
      ? dataProducts
      : dataProducts.filter((product) => product.category === selectedCategory);

  // Obtener todas las categorías únicas de los productos
  const TodosCategories = [
    "Todos",
    ...new Set(dataProducts.map((product) => product.category)),
  ];

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
          {filteredProducts.map((product, index) => (
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
                <p className="product-description">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Store;
