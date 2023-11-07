import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./SelectShipping.css";

const SelectShipping = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
console.log(options);
console.log(selectedOption);
  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div className="selected-option-preview" onClick={toggleSelect}>
        <span className="selected-option">Seleciona envio</span>
        <FontAwesomeIcon
          icon={isOpen ? faCaretUp : faCaretDown}
          className="arrow"
        />
      </div>
      {isOpen && (
        <div className="options-preview">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option-preview ${
                option === selectedOption ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectShipping;
