import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./select.css";

const RenderSelect = ({
  TodosCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
          {TodosCategories.primary.map((category, index) => (
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
