import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./store.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/navbar";
import { getProduct } from "../../functions/fetchingProducts";
import { AddCart } from "../../utils/addCart";
import { getProductDetail } from "../../functions/fetchingProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  const [dataProducts, SetDataProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [detailProduct, setDetailProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    CallProducts();
    callProductDetail(id);
  }, [id]);

  const callProductDetail = async (id) => {
    const data = await getProductDetail(id);
    setDetailProduct(data.product);
  };

  const handleQuantityChange = (product, amount) => {
    const updatedProducts = dataProducts.map((p) => {
      if (p._id === product._id) {
        const newQuantity = p.quantity + amount;
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    SetDataProducts(updatedProducts);
  };

  const addToCart = (product) => {
    AddCart(product.quantity, product);
    setQuantity(1);
  };

  const CallProducts = async () => {
    const data = await getProduct();

    const productsWithQuantity = data.map((product) => ({
      ...product,
      quantity: 1,
    }));
    SetDataProducts(productsWithQuantity);
  };

  const handlePriceFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (min > max) {
      alert("El precio mínimo no puede ser mayor que el precio máximo");
      return;
    }
    const filteredByPrice = dataProducts.filter((product) => {
      const productPrice = product.price;
      return (
        (minPrice === "" || productPrice >= parseFloat(minPrice)) &&
        (maxPrice === "" || productPrice <= parseFloat(maxPrice))
      );
    });

    setFilteredProducts(filteredByPrice);
    setCurrentPage(1);
  };

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? dataProducts
      : dataProducts.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    setFilteredProducts(filteredProductsByCategory);
    setCurrentPage(1);
  }, [filteredProductsByCategory, selectedCategory]);

  const TodosCategories = [
    "Todos",
    ...new Set(dataProducts.map((product) => product.category)),
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderSelect = () => {
    return (
      <select
        id="product-select"
        className="hidden-select custom-select"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {TodosCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <div className="navbar-store">
        <Navbar />
      </div>
      <div className="store-container">
        <div className="product-container">
          <div className="sidebar">
            <h2>Productos</h2>
            <div className="render-select">
            {renderSelect()}
            </div>
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
              <h3 className="h3-store">Rango de Precios</h3>
              <input
                className="input-price-store"
                type="number"
                placeholder="Precio Mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="input-price-store"
                type="number"
                placeholder="Precio Máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <div className="button-filter-store">
                <button className="button-filtrar" onClick={handlePriceFilter}>
                  Filtrar
                </button>
              </div>
            </div>
          </div>
          {currentProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <Link to={`/product/${product._id}`} key={index}>
                  <img src={product.image[0]} alt={product.title} />
                </Link>
              </div>
              <div className="detail-info">
                <p className="detail-title">{product.title}</p>
                <p className="detail-dimensions">{product.dimensions}</p>
                <p className="detail-price">${product.price}</p>
                <div className="buttons-quantity">
                  <div className="detail-quantity">
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(product, -1)}
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{product.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(product, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="add-to-cart-button-store"
                    onClick={() => addToCart(product)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            className="arrow-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
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
              currentPage >=
              Math.ceil(filteredProducts.length / productsPerPage)
            }
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Store;
