import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./store.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/navbar";
import { getProduct } from "../../functions/fetchingProducts";
import { AddCart } from "../../utils/addCart";
import { getProductDetail } from "../../functions/fetchingProducts";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/footer";

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
  const token = GetDecodedCookie("cookieToken");

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
    if (token) {
      AddCart(product.quantity, product);
      setQuantity(1); // Se reinicia la cantidad a 1
    } else {
      console.log("necesitas loguearte");
    }
  };

  const CallProducts = async () => {
    const data = await getProduct();
    // Configuro la propiedad 'quantity' para cada producto
    const productsWithQuantity = data.map((product) => ({
      ...product,
      quantity: 1, // se establece la cantidad inicial
    }));
    SetDataProducts(productsWithQuantity);
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
    setCurrentPage(1); // Actualizar productos filtrados
  };

  // Estado para el filtro
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtro los productos según categoría seleccionada
  const filteredProductsByCategory =
    selectedCategory === "Todos"
      ? dataProducts
      : dataProducts.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    // Se actualizan productos filtrados también cuando cambie la categoría
    setFilteredProducts(filteredProductsByCategory);
    setCurrentPage(1);
  }, [filteredProductsByCategory, selectedCategory]);

  // Obtengo todas las categorías únicas de los productos
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

  return (
    <>
      <div className="navbar-store">
        <Navbar />
      </div>
      <div className="store-container">
        <div className="product-container">
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
      <Footer />
    </>
  );
};

export default Store;
