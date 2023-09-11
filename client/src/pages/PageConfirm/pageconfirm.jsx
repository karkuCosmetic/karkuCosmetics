import React from "react";
import "./pageconfirm.css";
import Footer from "../../components/Footer/footer";

const PageConfirm = () => {
  return (
    <>
      <div>
        <div className="login-container">
          <div className="confirm-hello">
            <h2 className="text-hello">
              Confirma haciendo click en el siguiente botón
            </h2>
          </div>
          <button className="confirm-button">Continuar</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageConfirm;