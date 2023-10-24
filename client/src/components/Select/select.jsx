import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./select.css";

const RenderSelect = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isPrimary,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (isPrimary && categories.primary) {
      setSubCategories(categories.primary);
    } else if (categories.secondary) {
      let filteredSecondaryCategories = categories.secondary;

      if (!isPrimary && selectedCategory !== "Todos") {
        filteredSecondaryCategories = categories.secondary.filter(
          (secondaryCategory) => {
            return secondaryCategory.primaryCategory === selectedCategory;
          }
        );
      }

      setSubCategories(filteredSecondaryCategories);
    }
  }, [isPrimary, categories, selectedCategory]);

  const handleOptionSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`custom-select ${isOpen ? "open" : ""}`}
      onClick={toggleSelect}
    >
      <div className="selected-option">
        <span>{selectedCategory}</span>
        <FontAwesomeIcon
          icon={isOpen ? faCaretUp : faCaretDown}
          className="arrow"
        />
      </div>
      {isOpen && (
        <div className="options">
          {subCategories.map((category, index) => (
            <div
              key={index}
              className={`option ${
                category === selectedCategory ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderSelect;
