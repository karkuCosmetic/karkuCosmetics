import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logoKarkuCircular from "../../assets/logoKarkuCircular.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

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
    Swal.fire({
      title: "¿Confirmar cierre de sesión?",
      text: "¡Tu sesión actual se cerrará!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("cookieToken");
        window.location.href = "/login";
      }
    });
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
          <NavLink to="/" exact className="active">
            Inicio
          </NavLink>
          <NavLink to="#gallery" className="active">
            Galería
          </NavLink>
          <NavLink to="/contact" className="active">
            Contacto
          </NavLink>
          <NavLink to="/store" className="active">
            Tienda
          </NavLink>
          <NavLink to="/cart" className="active">
            Carrito
          </NavLink>
          {login === true ? (
            <>
              <NavLink to="/profile" className="active">
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
