import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="container-footer">
      <p>KARKU &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
