import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import "./Store.css";
import Navbar from "../../components/NavBar/navbar";
import { getProduct } from "../../functions/fetchingProducts";
import { AddCart } from "../../utils/addCart";
import { getProductDetail } from "../../functions/fetchingProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import RenderSelect from "../../components/Select/select";

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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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

    Swal.fire({
      position: "top",
      title: "Producto agregado a carrito",
      showConfirmButton: false,
      timer: 1000,
      width: 250,
      background: "#088046",
      customClass: {
        title: "swal-title",
        container: "swal-container",
        content: "swal-content",
      },
    });
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

  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  const redirectToProductDetail = (productId) => {
    navigate(`/product/${productId}`); // Utiliza navigate en lugar de history.push
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="page-container">
        <div className="navbar-store">
          <Navbar />
        </div>
        <div className={`store-container ${isSelectOpen ? "blur" : ""}`}>
          <div className="product-container">
            <div className="sidebar">
              <h2 className="sidebar-categories">Categorías</h2>
              <div className="render-select">
                <RenderSelect
                  TodosCategories={TodosCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  setIsSelectOpen={setIsSelectOpen}
                />
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
                <h3 className="h3-store">Precio</h3>
                <div className="inputs-filter">
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
                </div>
                <div className="button-filter-store">
                  <button
                    className="button-filtrar"
                    onClick={handlePriceFilter}
                  >
                    Filtrar
                  </button>
                </div>
              </div>
            </div>
            <div className="pagination-top">
              <button
                className="arrow-button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              {filteredProducts.length > productsPerPage &&
                Array.from(
                  {
                    length: Math.ceil(
                      filteredProducts.length / productsPerPage
                    ),
                  },
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
            <div className="cards-container">
              {currentProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-image"   onClick={() => redirectToProductDetail(product._id)}>
                    <img src={product.image[0]} alt={product.title} />
                    <div className="detail-info-store">
                      <p className="title-store">{product.title}</p>
                      <p className="price">${product.price}</p>
                    </div>
                  </div>
                  <div className="buttons-quantity">
                    <button
                      className="btn-see-more"
                      onClick={() => redirectToProductDetail(product._id)}
                    >
                      Ver más
                    </button>
                    <div className="detail-quantity-store">
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(product, -1)}
                        disabled={product.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-store">{product.quantity}</span>
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
              ))}
            </div>
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
                {
                  length: Math.ceil(filteredProducts.length / productsPerPage),
                },
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
      </div>
    </>
  );
};

export default Store;
