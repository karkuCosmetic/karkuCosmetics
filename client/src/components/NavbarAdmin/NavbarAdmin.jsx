import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavbarAdmin.css";
import logoKarkuCircular from "../../assets/logoKarkuCircular.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const NavbarAdmin = () => {
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
    <div className="navbar-admin">
      <div className="container-navbarAdmin">
        <div className="navbarAdmin-left">
          <Link to="/admin/home">
            <img src={logoKarkuCircular} alt="Logo de Karku" className="logo-admin" />
          </Link>
        </div>
        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="menu-icon" />
        </button>

        <nav className={`nav-links-admin ${menuOpen ? "open" : ""}`}>
          <NavLink to="/admin/home" exact className="active">
            Inicio
          </NavLink>

          <a href="#" onClick={handleLogout} alt="Cerrar Sesion">
            <FontAwesomeIcon icon={faSignOut} />
          </a>
        </nav>
      </div>
      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default NavbarAdmin;
