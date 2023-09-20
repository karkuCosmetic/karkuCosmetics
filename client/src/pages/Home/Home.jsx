import React from "react";
import "./Home.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <section className="welcome">
        <div className="container-home ">
          <h1>Karku - Cosmética Natural</h1>
          <p>
            ¡Tenemos las mejores opciones para el cuidado de piel, cabello y
            más!
          </p>
          <a href="/store" className="cta-button">
            Ver Tienda
          </a>
        </div>
      </section>
      <section id="features" className="features-section">
        <div className="container-home">
          <h2>Características</h2>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>{" "}
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="object">
            <h3>objeto</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
