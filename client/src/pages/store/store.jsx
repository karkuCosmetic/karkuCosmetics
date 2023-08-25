import React, { useEffect, useState } from "react";
import { getProduct } from "../../redux/Controllers/productController";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./store.css";
import Navbar from "../../components/NavBar/navbar";

const Store = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const dataProducts = useSelector((state) => state.product.products);
  console.log(dataProducts);

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
          <div className="filters-box hidden-large">
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              {" "}
              {TodosCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
    </>
  );
};

export default Store;
