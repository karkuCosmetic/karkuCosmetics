import React from "react";
import "./Home.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <section className="welcome">
        <div className="welcome-home ">
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
      <div className="divider"></div>
      <section id="features" className="features">
        <div className="">
          <div className="section1-home">
            <div className="section1-1-home">
              <div className="text1-home">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
              <div className="img1-home"></div>
              <h3>objeto1</h3>
            </div>
            <div className="section1-2-home">
              <div className="text2-home"></div>
              <div className="img2-home"></div>
              <h3>objeto2</h3>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
 