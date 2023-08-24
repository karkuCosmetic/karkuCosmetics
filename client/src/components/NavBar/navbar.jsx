import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo.png';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState (false);

  const toggleMenu = () => {
    setMenuOpen (!menuOpen);
  };

  const auth = useSelector (state => state.auth.session);
//si es true mapear opciones de session logeada else las no iniciada , abrazo crackk!!
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
          <li><a href="/profile">Perfil</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
