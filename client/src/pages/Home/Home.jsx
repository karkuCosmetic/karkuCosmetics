import React, { useEffect, useState } from "react";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import KarkuImg6 from "../../assets/AssetsHome/Karku6.jpg";
import KarkuImg2 from "../../assets/AssetsHome/Karku2.jpg";
import KarkuImg3 from "../../assets/AssetsHome/Karku3.jpg";
import KarkuImg7 from "../../assets/AssetsHome/Karku7.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Gallery from "../../components/GalleryHome/Gallery";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    AOS.init();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
          <Link to="/store" className="store-btn-home ">
            Ver Tienda
          </Link>
        </div>
      </section>
      <section id="features" className="features">
        <div className="textIntro-sections">
          <p data-aos="zoom-in">
            Descubre la belleza y los beneficios de la cosmética natural con
            Karku. Nuestra pasión es brindarte productos de cuidado personal de
            alta calidad, hechos con ingredientes naturales y sostenibles para
            realzar tu belleza de manera saludable y respetuosa con el medio
            ambiente.
          </p>
        </div>
        <div className="sections-home-container">
          <div className="section1-home">
            <div className="section1-1-home">
              <p className="title-section">Capilares</p>
              <div className="text1-img-home">
                <div className="text1-home" data-aos="zoom-in-right">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
                <div className="img1-home" data-aos="flip-right">
                  <div class="gallery">
                    <img src={KarkuImg6} alt="" />
                    <img src={KarkuImg7} alt="" />
                    <img src={KarkuImg3} alt="" />
                    <img src={KarkuImg2} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="section1-2-home bg-color-section">
              <p className="title-section">Corporales</p>
              <div className="text2-img-home">
                <div className="img1-home" data-aos="flip-left">
                  <div class="gallery">
                    <img src={KarkuImg6} alt="" />
                    <img src={KarkuImg7} alt="" />
                    <img src={KarkuImg3} alt="" />
                    <img src={KarkuImg2} alt="" />
                  </div>
                </div>
                <div className="text2-home" data-aos="zoom-in-left">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            </div>
            <div className="section1-3-home">
              <p className="title-section">Faciales</p>
              <div className="text3-img-home">
                <div className="text3-home" data-aos="zoom-in-right">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
                <div className="img1-home" data-aos="flip-left">
                  <div class="gallery">
                    <img src={KarkuImg6} alt="" />
                    <img src={KarkuImg7} alt="" />
                    <img src={KarkuImg3} alt="" />
                    <img src={KarkuImg2} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="section1-3-home bg-color-section">
              <p className="title-section">Serums</p>
              <div className="text3-img-home">
                <div className="img1-home" data-aos="flip-left">
                  <div class="gallery">
                    <img src={KarkuImg6} alt="" />
                    <img src={KarkuImg7} alt="" />
                    <img src={KarkuImg3} alt="" />
                    <img src={KarkuImg2} alt="" />
                  </div>
                </div>
                <div className="text3-home" data-aos="zoom-in-left">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showScrollButton && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
        )}
      </section>
      <div className="gallery-home-container">
      <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
