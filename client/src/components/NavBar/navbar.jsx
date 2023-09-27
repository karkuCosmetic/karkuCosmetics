import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" exact activeClassName="active">
            Inicio
          </NavLink>
          <NavLink to="#about" activeClassName="active">
            Sobre Nosotros
          </NavLink>
          <NavLink to="#gallery" activeClassName="active">
            Galería
          </NavLink>
          <NavLink to="/contact" activeClassName="active">
            Contacto
          </NavLink>
          <NavLink to="/store" activeClassName="active">
            Tienda
          </NavLink>
          <NavLink to="/cart" activeClassName="active">
            Carrito
          </NavLink>
          {login === true ? (
            <>
              <NavLink to="/profile" activeClassName="active">
                Ir a Perfil
              </NavLink>
              <a href="#" onClick={handleLogout} alt="Cerrar Sesion">
                <FontAwesomeIcon icon={faSignOut} />
              </a>
            </>
          ) : (
            <a href="/login">Ingresar</a>
          )}
        </nav>
      </div>
      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
