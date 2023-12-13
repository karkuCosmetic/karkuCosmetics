import React, { useEffect, useState } from "react";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Gallery from "../../components/GalleryHome/Gallery";

import KarkuLogoName from "../../assets/karkuLogoName.png";

// CAPILAR
import Capilar1 from "../../assets/AssetsHome/Capilar/Capilar1.png";
import Capilar2 from "../../assets/AssetsHome/Capilar/Capilar2.png";
import Capilar3 from "../../assets/AssetsHome/Capilar/Capilar3.png";
import Capilar4 from "../../assets/AssetsHome/Capilar/Capilar4.png";

//CORPORAL
import Corporal1 from "../../assets/AssetsHome/Corporal/Corporal1.png";
import Corporal2 from "../../assets/AssetsHome/Corporal/Corporal2.png";
import Corporal3 from "../../assets/AssetsHome/Corporal/Corporal3.png";
import Corporal4 from "../../assets/AssetsHome/Corporal/Corporal4.png";

//FACIAL
import Facial1 from "../../assets/AssetsHome/Facial/Facial1.png";
import Facial2 from "../../assets/AssetsHome/Facial/Facial2.png";
import Facial3 from "../../assets/AssetsHome/Facial/Facial3.png";
import Facial4 from "../../assets/AssetsHome/Facial/Facial4.png";

//SERUMS
import Serum1 from "../../assets/AssetsHome/Serum/Serum1.png";
import Serum2 from "../../assets/AssetsHome/Serum/Serum2.png";
import Serum3 from "../../assets/AssetsHome/Serum/Serum3.png";
import Serum4 from "../../assets/AssetsHome/Serum/Serum4.png";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <div className="welcome-home" data-aos="zoom-in">
          <img className="karku-logo-name" src={KarkuLogoName} alt="" />
          <p>
            ¡Tenemos las mejores opciones para el cuidado de piel, cabello y
            más!
          </p>
        </div>
          <Link to="/store" className="store-btn-home ">
            Ver Tienda
          </Link>
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
        <div className="section1-home">
          <div className="section1-1-home" data-aos="zoom-in">
            <p className="title-section">Capilares</p>
            <p>
              Los productos de cosmética capilar natural son una elección
              perfecta para mantener la salud y belleza de tu cabello de manera
              sostenible. El uso de ingredientes naturales, como aceites
              esenciales, extractos de plantas y aceites vegetales, ayuda a
              fortalecer el cabello, aportando brillo y suavidad. Estos
              productos evitan la exposición a químicos dañinos, lo que es
              beneficioso tanto para tu cabello como para el medio ambiente.
            </p>
            <div className="img1-home" data-aos="flip-right">
              <div class="gallery">
                <img src={Capilar1} alt="" />
                <img src={Capilar2} alt="" />
                <img src={Capilar3} alt="" />
                <img src={Capilar4} alt="" />
              </div>
            </div>
          </div>
          <div className="section1-2-home " data-aos="zoom-in">
            <p className="title-section">Corporales</p>
            <p>
              Los productos de cuidado corporal naturales, como cremas, sueros y
              jabones, son esenciales para una rutina de cuidado de la piel
              saludable y respetuosa con el planeta. Estos productos están
              formulados con ingredientes naturales, como aceites esenciales,
              mantecas vegetales y extractos de plantas, que nutren y protegen
              la piel de manera efectiva.
            </p>
            <div className="img1-home" data-aos="flip-left">
              <div class="gallery">
                <img src={Corporal1} alt="" />
                <img src={Corporal2} alt="" />
                <img src={Corporal3} alt="" />
                <img src={Corporal4} alt="" />
              </div>
            </div>
          </div>
          <div className="section1-3-home" data-aos="zoom-in">
            <p className="title-section">Faciales</p>
            <p>
              Los productos de cuidado facial naturales, como cremas, sueros y
              limpiadores, son esenciales para mantener una piel sana y
              radiante. Formulados con ingredientes naturales como aceites
              esenciales y extractos de plantas, estos productos nutren y
              protegen la piel de manera efectiva sin el uso de químicos
              agresivos. Optar por la cosmética facial natural es una elección
              respetuosa con tu piel y el medio ambiente.
            </p>
            <div className="img1-home" data-aos="flip-left">
              <div class="gallery">
                <img src={Facial1} alt="" />
                <img src={Facial2} alt="" />
                <img src={Facial3} alt="" />
                <img src={Facial4} alt="" />
              </div>
            </div>
          </div>
          <div className="section1-4-home" data-aos="zoom-in">
            <p className="title-section">Serums</p>
            <p>
              Los serums faciales naturales son una opción ideal para una piel
              radiante y saludable. Con ingredientes naturales como aceites
              esenciales y antioxidantes, estos productos aportan una
              hidratación profunda y combaten el envejecimiento de la piel de
              manera efectiva, sin químicos agresivos. Al elegir serums faciales
              naturales, estás cuidando tu piel de forma consciente y respetando
              el medio ambiente.
            </p>
            <div className="img1-home" data-aos="flip-left">
              <div class="gallery">
                <img src={Serum1} alt="" />
                <img src={Serum2} alt="" />
                <img src={Serum3} alt="" />
                <img src={Serum4} alt="" />
              </div>
            </div>
          </div>
        </div>

        {showScrollButton && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
        )}
        <div className="gallery-home-container" id="gallery" data-aos="zoom-in">
          <p className="title-carousel">
            "En Karku, podés encontrar una amplia gama de productos
            confeccionados a partir de materiales premium de alta calidad."
          </p>
          <Gallery />
        </div>
        <div className="map-container">
          <div className="text-map-home" data-aos="zoom-in">
            <p>Karku se ubica en la ciudad de Zárate.</p>
            <br />
            <p>
              Los envíos realizados a través de nuestra página web se gestionan
              mediante Correo Argentino. La opción de "Acordar con el vendedor"
              está disponible exclusivamente para compradores ubicados en la
              ciudad de Zárate y Campana. Si te encuentras fuera de esta zona,
              podrás seleccionar la dirección de envío por correo al completar
              tu compra.
            </p>
          </div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52852.96297417752!2d-59.0660202!3d-34.1128079!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb0b6a92357b4d%3A0x5f7d9ac7c145085d!2sZ%C3%A1rate%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1698780328120!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
          ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
