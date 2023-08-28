import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo.png';
import {useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState (false);
  const [login, setLogin] = useState (false);

  const toggleMenu = () => {
    setMenuOpen (!menuOpen);
  };

  useEffect (() => {
    const token = GetDecodedCookie ('cookieToken');
    if (token) {
      setLogin (true);
    } else {
      setLogin (false);
    }
  }, []);
  //si hay token estoy logeado, entonces condiciono la navbar
  
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Logo de Karku" className="logo" />
          </Link>
        </div>
        <button
          className={`menu-button ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span className="menu-icon" />
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#about">Sobre Nosotros</a></li>
          <li><a href="#gallery">Galería</a></li>
          <li><a href="/contact">Contacto</a></li>
          <li><a href="/store">Tienda</a></li>
          {login === true
            ? <li><a href="/profile">Perfil</a></li>
            : <li><a href="/login">ingresar</a></li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
