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
                    Los productos de cosmética capilar natural son una elección
                    perfecta para mantener la salud y belleza de tu cabello de
                    manera sostenible. El uso de ingredientes naturales, como
                    aceites esenciales, extractos de plantas y aceites
                    vegetales, ayuda a fortalecer el cabello, aportando brillo y
                    suavidad. Estos productos evitan la exposición a químicos
                    dañinos, lo que es beneficioso tanto para tu cabello como
                    para el medio ambiente. Además, la cosmética capilar natural
                    suele ser libre de crueldad animal, promoviendo prácticas
                    éticas en la industria.
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
                    Los productos de cuidado corporal naturales, como cremas,
                    sueros y jabones, son esenciales para una rutina de cuidado
                    de la piel saludable y respetuosa con el planeta. Estos
                    productos están formulados con ingredientes naturales, como
                    aceites esenciales, mantecas vegetales y extractos de
                    plantas, que nutren y protegen la piel de manera efectiva.
                    Al optar por la cosmética corporal natural, estás evitando
                    la exposición a químicos agresivos y optando por soluciones
                    respetuosas con el medio ambiente.
                  </p>
                </div>
              </div>
            </div>
            <div className="section1-3-home">
              <p className="title-section">Faciales</p>
              <div className="text3-img-home">
                <div className="text3-home" data-aos="zoom-in-right">
                  <p>
                    Los productos de cuidado facial naturales, como cremas,
                    sueros y limpiadores, son esenciales para mantener una piel
                    sana y radiante. Formulados con ingredientes naturales como
                    aceites esenciales y extractos de plantas, estos productos
                    nutren y protegen la piel de manera efectiva sin el uso de
                    químicos agresivos. Optar por la cosmética facial natural es
                    una elección respetuosa con tu piel y el medio ambiente.
                    Además, muchas marcas éticas no realizan pruebas en
                    animales, lo que hace que cuidar tu piel sea una experiencia
                    consciente y compasiva. ¡Descubre la belleza de la
                    naturaleza en tu rutina de cuidado facial!
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
                    Los serums faciales naturales son una opción ideal para una
                    piel radiante y saludable. Con ingredientes naturales como
                    aceites esenciales y antioxidantes, estos productos aportan
                    una hidratación profunda y combaten el envejecimiento de la
                    piel de manera efectiva, sin químicos agresivos. Al elegir
                    serums faciales naturales, estás cuidando tu piel de forma
                    consciente y respetando el medio ambiente. Además, muchas
                    marcas éticas no realizan pruebas en animales, lo que hace
                    que el cuidado de tu piel sea una elección compasiva.
                    Descubre la belleza natural en cada gota de serum.
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
        <div className="gallery-home-container" id="gallery">
          <p className="title-carousel">
            "En Karku, podés encontrar una amplia gama de productos
            confeccionados a partir de materiales premium de alta calidad."
          </p>
          <Gallery />
        </div>
        <div className="map-container">
          <div className="text-map-home">
            <p>Karku se ubica en la ciudad de Zárate.</p>
            <br />
            <p>
              La opción "Acordar con el vendedor" está disponible únicamente
              para compradores que se encuentren en la ciudad de Zárate. Si te
              encuentras fuera de esta zona, por favor selecciona la opción de
              envío por correo al realizar tu compra.
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
