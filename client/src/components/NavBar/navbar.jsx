import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logoKarkuCircular from "../../assets/logoKarkuCircular.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = GetDecodedCookie("cookieToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = encodeURIComponent("cookieToken") + "=" + "";
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img src={logoKarkuCircular} alt="Logo de Karku" className="logo" />
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
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/#about">Sobre Nosotros</a>
          </li>
          <li>
            <a href="/#gallery">Galería</a>
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
            <>
              <li>
                <Link to="/profile">Ir a Perfil</Link>
              </li>
              <li>
                <a href="#" onClick={handleLogout} alt="Cerrar Sesion">
                  <FontAwesomeIcon icon={faSignOut} />
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Ingresar</a>
            </li>
          )}
        </ul>
        </div>
        <div
          className={`overlay ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        />
 
    </nav>
  );
};

export default Navbar;
