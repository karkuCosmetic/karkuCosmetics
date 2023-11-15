import React, { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { useParams, useNavigate } from "react-router-dom";
import "./Store.css";
import Navbar from "../../components/NavBar/navbar";
import { getAllCategories, getProduct } from "../../functions/fetchingProducts";
import { AddCart } from "../../utils/addCart";
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
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState({
    primary: ["Todos"],
    secondary: ["Todos"],
  });

  useEffect(() => {
    CallProducts();
    window.scrollTo(0, 0);
  }, [id]);

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
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 150000000,
      customClass: {
        content: "content-add-to-cart",
        title: "title-add-to-cart",
        container: "swal-container-store",
      },
    });
  };

  const CallProducts = async () => {
    setIsLoading(true);
    const data = await getProduct();
    const productsWithQuantity = data.map((product) => ({
      ...product,
      quantity: 1,
    }));
    SetDataProducts(productsWithQuantity);
    await getAllCategories().then((data) => {
      setCategories({
        ...categories,
        primary: [...categories.primary, ...data.categories.primary],
        secondary: [...categories.secondary, ...data.categories.secondary],
      });
      setIsLoading(false); 
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearch = () => {
    console.log("Search query: ", searchQuery);
    const query = searchQuery.toLowerCase();
    const filteredProducts = dataProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setSearchResults(filteredProducts);
    setCurrentPage(1);
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

  const [selectedCategory, setSelectedCategory] = useState({
    primary: "Todos",
    secondary: "Todos",
  });
  useEffect(() => {
    const filteredProductsByCategory = dataProducts.filter((product) => {
      const primaryMatch =
        selectedCategory.primary === "Todos" ||
        product.category.primary === selectedCategory.primary;
      const secondaryMatch =
        selectedCategory.secondary === "Todos" ||
        product.category.secondary === selectedCategory.secondary;
      return primaryMatch && secondaryMatch;
    });
    setFilteredProducts(filteredProductsByCategory);
    setCurrentPage(1);
  }, [dataProducts, selectedCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    let secundaria = new Set(
      filteredProducts.map((el) => el.category.secondary)
    );
    setCategories({ ...categories, secondary: ["Todos", ...secundaria] });
  }, [filteredProducts, selectedCategory]);

  const navigate = useNavigate();

  const redirectToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="page-container">
        <div className="navbar-store">
          <Navbar />
        </div>
        <div className={`store-container ${isSelectOpen ? "blur" : ""}`}>
          {isLoading ? (
            <div className="loader-container">
              <FadeLoader
                color="#317d24"
                size={300}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <>
              <div className="product-container">
                <div className="sidebar">
                  <div className="searchBar-filter">
                    <input
                      className="input-searchBar-store"
                      type="text"
                      placeholder="Buscar por nombre..."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    <button onClick={handleSearch}>Buscar</button>
                  </div>
                  <div className="render-select">
                    <RenderSelect
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      isPrimary={true}
                    />
                    <RenderSelect
                      categories={categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      isPrimary={false}
                    />
                  </div>
                  <ul className="ul-categories">
                    <div className="title-categories-sidebar">
                      <p>Categorías</p>
                    </div>

                    {categories.primary.map((category, index) => (
                      <li
                        key={index}
                        className={
                          selectedCategory.primary === category ? "active" : ""
                        }
                        onClick={() =>
                          setSelectedCategory({
                            ...selectedCategory,
                            primary: category,
                          })
                        }
                      >

       
                        {category}
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <div className="title-subcategories-sidebar">
                      <p>Productos</p>
                    </div>
                    {categories.secondary.map((category, index) => (
                      <li
                        key={index}
                        className={
                          selectedCategory.secondary === category
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setSelectedCategory({
                            ...selectedCategory,
                            secondary: category,
                          })
                        }
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                  <div className="price-filter">
                    <p className="h3-store">Precio</p>
                    <div className="inputs-filter">
                      <input
                        className="input-price-store"
                        type="number"
                        placeholder="$ Mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />

                      <input
                        className="input-price-store"
                        type="number"
                        placeholder="$ Máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <button
                        className="button-filtrar"
                        onClick={handlePriceFilter}
                      >
                        Filtrar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cards-container">
                  {searchResults.length > 0
                    ? searchResults.map((product, index) => (
                        <div key={index} className="product-card">
                          <div
                            className="product-image"
                            onClick={() => redirectToProductDetail(product._id)}
                          >
                            <img src={product.image[0]} alt={product.title} />
                            <div className="detail-info-store">
                              <p className="title-store">{product.title}</p>
                              <p className="price">${product.price}</p>
                            </div>
                          </div>
                          <div className="buttons-quantity">
                            <button
                              className="btn-see-more"
                              onClick={() =>
                                redirectToProductDetail(product._id)
                              }
                            >
                              Ver
                            </button>
                            <div className="detail-quantity-store">
                              <button
                                className="quantity-button"
                                onClick={() =>
                                  handleQuantityChange(product, -1)
                                }
                                disabled={product.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="quantity-store">
                                {product.quantity}
                              </span>
                              <button
                                disabled={product.quantity >= 10}
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
                      ))
                    : currentProducts.map((product, index) => (
                        <div key={index} className="product-card">
                          <div
                            className="product-image"
                            onClick={() => redirectToProductDetail(product._id)}
                          >
                            <img src={product.image[0]} alt={product.title} />
                            <div className="detail-info-store">
                              <p className="title-store">{product.title}</p>
                              <p className="price">${product.price}</p>
                            </div>
                          </div>
                          <div className="buttons-quantity">
                            <button
                              className="btn-see-more"
                              onClick={() =>
                                redirectToProductDetail(product._id)
                              }
                            >
                              Ver
                            </button>
                            <div className="detail-quantity-store">
                              <button
                                className="quantity-button"
                                onClick={() =>
                                  handleQuantityChange(product, -1)
                                }
                                disabled={product.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="quantity-store">
                                {product.quantity}
                              </span>
                              <button
                                disabled={product.quantity >= 10}
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
                {searchResults.length > 0
                  ? null
                  : Array.from(
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
