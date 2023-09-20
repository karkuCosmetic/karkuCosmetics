import React, { useEffect, useState } from "react";
import "./Pageconfirm.css";
import Footer from "../../components/Footer/footer";
import { useParams } from "react-router-dom";
import { DecodedToken } from "../../utils/DecodedToken";
import { ConfirmEmail } from "../../functions/fetchingUsers";

const PageConfirm = () => {
  const { token } = useParams();

  const [uid, setUid] = useState("");

  useEffect(() => {
    let { value } = DecodedToken(token);
    setUid(value);
  }, [token]);

  const handlerUpdate = () => {
    console.log(uid);
    ConfirmEmail(uid, true);
    window.location.href = "/login";
  };

  return (
    <div>
      <div>
        <div className="login-container">
          <div className="confirm-hello">
            <h2 className="text-hello">
              Confirma haciendo click en el siguiente botón
            </h2>
          </div>
          <button className="confirm-button" onClick={handlerUpdate}>
            Continuar
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageConfirm;
