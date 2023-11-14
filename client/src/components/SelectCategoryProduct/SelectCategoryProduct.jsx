import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SelectCategoryProduct.css";
import { getAllCategories } from "../../functions/fetchingProducts";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const SelectCategoryProduct = ({ setProduct }) => {
  const [isOpenPrimary, setIsOpenPrimary] = useState(false);
  const [selectedOptionPrimary, setSelectedOptionPrimary] = useState("");
  const [catPrimary, setCatPrimary] = useState([
    "Capilar",
    "Corporal",
    "Dental",
    "Facial",
  ]);

  const [isOpenSecondary, setIsOpenSecondary] = useState(false);
  const [selectedOptionSecondary, setSelectedOptionSecondary] = useState("");
  const [catSecondary, setCatSecondary] = useState([
    "Shampoo",
    "Acondicionador",
    "Oleo",
    "Crema",
    "Desodorante",
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
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [selectedOptionCategories, setSelectedOptionCategories] = useState("");

  const option = ["primary", "secondary"];

  useEffect(() => {
    getAllCategories().then((data) => {
      const uniqueCatPrimary = new Set([
        ...catPrimary,
        ...data.categories.primary,
      ]);
      const uniqueCatSecondary = new Set([
        ...catSecondary,
        ...data.categories.secondary,
      ]);
      setCatPrimary(Array.from(uniqueCatPrimary).sort());
      setCatSecondary(Array.from(uniqueCatSecondary).sort());
    });
  }, []);

  const getSlicedAndSortedOptions = (options) =>
    options.sort((a, b) => a.localeCompare(b));

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
    setIsOpenCategories(!isOpenCategories);
  };

  const handleOptionSelectCategorie = (option) => {
    setSelectedOptionCategories(option);
  };

  const handleAddCategory = () => {
    if (selectedOptionCategories === "primary") {
      setCatPrimary(
        [
          ...catPrimary,
          AddCategory[0].toUpperCase() + AddCategory.slice(1),
        ].sort()
      );
    } else {
      setCatSecondary(
        [
          ...catSecondary,
          AddCategory[0].toUpperCase() + AddCategory.slice(1),
        ].sort()
      );
    }
  };

  return (
    <>
      <div className="select-categories-modal-admin">
        <div className="category-primary-admin">
          <p>Primaria</p>
          <div
            className={`custom-select-status ${isOpenPrimary ? "open" : ""}`}
            onClick={toggleSelect}
          >
            <div className="selected-option-preview">
              <span>{selectedOptionPrimary}</span>
              <FontAwesomeIcon
                icon={isOpenPrimary ? faCaretUp : faCaretDown}
                className="arrow"
              />
            </div>
            {isOpenPrimary && (
              <div className="options-preview">
                <div className="scrollable-options">
                  {getSlicedAndSortedOptions(catPrimary).map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`option-preview ${
                          option === selectedOptionPrimary ? "selected" : ""
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="category-secondary-admin">
          <p>Secundaria</p>
          <div
            className={`custom-select-status ${isOpenSecondary ? "open" : ""}`}
            onClick={toggleSelectSecondary}
          >
            <div className="selected-option-preview">
              <span>{selectedOptionSecondary}</span>
              <FontAwesomeIcon
                icon={isOpenSecondary ? faCaretUp : faCaretDown}
                className="arrow"
              />
            </div>
            {isOpenSecondary && (
              <div className="options-preview">
                <div className="scrollable-options">
                  {getSlicedAndSortedOptions(catSecondary).map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`option-preview ${
                          option === selectedOptionSecondary ? "selected" : ""
                        }`}
                        onClick={() => handleOptionSelectSecondary(option)}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>{" "}
      </div>
      <div>
        <div className="add-categorie-product-adm">
          <p>Agregar categoría</p>
          <div className="inputs-newCategorie-adm">
            <input
              type="text"
              placeholder="Nueva Categoría"
              value={AddCategory}
              onChange={handleInputChange}
            />
            <div
              className={`custom-select-status ${
                isOpenCategories ? "open" : ""
              }`}
              onClick={toggleSelectCategories}
            >
              <div className="selected-option-preview-addCat">
                <span>
                  {selectedOptionCategories === "primary"
                    ? "Primaria"
                    : "Secundaria"}
                </span>
                <FontAwesomeIcon
                  icon={isOpenCategories ? faCaretUp : faCaretDown}
                  className="arrow"
                />
              </div>
              {isOpenCategories && (
                <div className="options-preview">
                  {option.map((option, index) => (
                    <div
                      key={index}
                      className={`option-preview ${
                        option === selectedOptionCategories ? "selected" : ""
                      }`}
                      onClick={() => handleOptionSelectCategorie(option)}
                    >
                      {option === "primary" ? "Primaria" : "Secundaria"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="add-category" onClick={handleAddCategory}>
          Agregar
        </button>
      </div>
    </>
  );
};

export default SelectCategoryProduct;
