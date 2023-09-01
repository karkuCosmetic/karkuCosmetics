import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    const token = GetDecodedCookie("cookieToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  //si hay token estoy logeado, entonces condiciono la navbar
  const handleLogout = () => {
    document.cookie =
    encodeURIComponent("cookieToken") + "=" + "";
    window.location.reload ();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Logo de Karku" className="logo" />
          </Link>
        </div>
        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="menu-icon" />
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#about">Sobre Nosotros</a>
          </li>
          <li>
            <a href="#gallery">Galería</a>
          </li>
          <li>
            <a href="/contact">Contacto</a>
          </li>
          <li>
            <a href="/store">Tienda</a>
          </li>
          <li>
            <a href="/cart">Carrito</a>
          </li>
          {login === true ? (
            <li className={`profile-menu ${profileMenuOpen ? "open" : ""}`}>
              <button className="profile-link" onClick={toggleProfileMenu}>
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
              </button>
              {profileMenuOpen && (
                <ul className="profile-dropdown">
                  <li>
                    <Link to="/profile">Ir a Perfil</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogout}>
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <a href="/login">Ingresar</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
