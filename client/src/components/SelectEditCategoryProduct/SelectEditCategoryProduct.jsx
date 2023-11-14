import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./SelectEditCategoryProduct.css";
import { getAllCategories } from "../../functions/fetchingProducts";

const SelectEditCategoryProduct = ({ setProduct, product }) => {
  const [isOpenPrimary, setIsOpenPrimary] = useState(false);
  const [selectedOptionPrimary, setSelectedOptionPrimary] = useState();
  const [catPrimary, setCatPrimary] = useState([
    "Capilar",
    "Corporal",
    "Dental",
    "Facial",
  ]);
  const [isOpenSecondary, setIsOpenSecondary] = useState(false);
  const [selectedOptionSecondary, setSelectedOptionSecondary] = useState();
  const [catSecondary, setCatSecondary] = useState([
    "Shampoo",
    "Acondicionado",
    "Oleo",
    "Crema",
    "desodorante",
    "Jabon",
    "Sal",
    "Bomba",
    "Pasta",
    "Cepillo",
    "Estuche",
    "Hilo",
    "Tonico",
    "Desmaquillante",
    "Serum",
    "Agua",
    "Kit",
  ]);

  const [AddCategory, setAddCategory] = useState("");
  const [isOpenCateogries, setIsOpenCategories] = useState(false);
  const [selectedOptionCategories, setSelectedOptionCategories] = useState("");

  const option = ["primary", "secondary"];
  useEffect(() => {
    // setSelectedOptionPrimary(product.primary)
    // setSelectedOptionSecondary(product.secondary)
    getAllCategories().then((data) => {
      const uniqueCatPrimary = new Set([
        ...catPrimary,
        ...data.categories.primary,
      ]);
      const uniqueCatSecondary = new Set([
        ...catSecondary,
        ...data.categories.secondary,
      ]);
      setCatPrimary(Array.from(uniqueCatPrimary));
      setCatSecondary(Array.from(uniqueCatSecondary));
    });
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOptionPrimary(option);
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        primary: option,
      },
    }));
    setIsOpenPrimary(false);
  };

  const toggleSelect = () => {
    setIsOpenPrimary(!isOpenPrimary);
  };

  const handleOptionSelectSecondary = (option) => {
    setSelectedOptionSecondary(option);
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        secondary: option,
      },
    }));
    setIsOpenSecondary(false);
  };

  const toggleSelectSecondary = () => {
    setIsOpenSecondary(!isOpenSecondary);
  };

  const handleInputChange = (event) => {
    setAddCategory(event.target.value);
  };

  const toggleSelectCategories = () => {
    setIsOpenCategories(!isOpenCateogries);
  };
  const handleOptionSelectCategorie = (option) => {
    setSelectedOptionCategories(option);
  };

  const handleAddCategorie = () => {
    if (selectedOptionCategories === "primary") {
      setCatPrimary([...catPrimary, AddCategory]);
    } else {
      setCatSecondary([...catSecondary, AddCategory]);
    }
  };

  return (
    <div className="edit-categiories-modal-admin">
      <div className="categories-container">
        <div className="edit-primary-catergories">
          <p>Primaria</p>
          <div
            className={`custom-select-status ${isOpenPrimary ? "open" : ""}`}
            onClick={toggleSelect}
          >
            <div className="selected-option-preview">
              <span>
                {product && product.primary
                  ? product.primary
                  : selectedOptionPrimary}
              </span>
              <FontAwesomeIcon
                icon={isOpenPrimary ? faCaretUp : faCaretDown}
                className="arrow"
              />
            </div>

            {isOpenPrimary && (
              <div className="options-preview">
                {catPrimary.map((option, index) => (
                  <div
                    key={index}
                    className={`option-preview ${
                      option === selectedOptionPrimary ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p>Secundaria</p>
          <div
            className={`custom-select-status ${isOpenSecondary ? "open" : ""}`}
            onClick={toggleSelectSecondary}
          >
            <div className="selected-option-preview">
              <span>
                {product && product.secondary
                  ? product.secondary
                  : selectedOptionSecondary}
              </span>
              <FontAwesomeIcon
                icon={isOpenSecondary ? faCaretUp : faCaretDown}
                className="arrow"
              />
            </div>

            {isOpenSecondary && (
              <div className="options-preview">
                {catSecondary.map((option, index) => (
                  <div
                    key={index}
                    className={`option-preview ${
                      option === selectedOptionSecondary ? "selected" : ""
                    }`}
                    onClick={() => handleOptionSelectSecondary(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Agregar categoria</p>
          <div className="inputs-newCategory-adm">
            <input
              type="text"
              placeholder="Nueva Categoría"
              value={AddCategory}
              onChange={handleInputChange}
            />
            <div
              className={`custom-select-status ${
                isOpenSecondary ? "open" : ""
              }`}
              onClick={toggleSelectCategories}
            >
              <div className="selected-option-preview">
                <span>{selectedOptionCategories}</span>
                <FontAwesomeIcon
                  icon={isOpenCateogries ? faCaretUp : faCaretDown}
                  className="arrow"
                />
              </div>

              {isOpenCateogries && (
                <div className="options-preview">
                  {option.map((option, index) => (
                    <div
                      key={index}
                      className={`option-preview ${
                        option === selectedOptionCategories ? "selected" : ""
                      }`}
                      onClick={() => handleOptionSelectCategorie(option)}
                    >
                      {option === "primary" ? "primaria" : "secundaria"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="add-category" onClick={() => handleAddCategorie()}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default SelectEditCategoryProduct;
