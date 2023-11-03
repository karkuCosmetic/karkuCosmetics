import React, { useEffect, useState } from "react";
import "./Pageconfirm.css";
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
    ConfirmEmail(uid, true);
    window.location.href = "/login";
  };

  return (
    <div>
      <div>
        <div className="confirm-container">
          <div className="confirm-hello">
            <p className="text-hello">
              Confirma haciendo click en el siguiente botón
            </p>
          </div>
          <button className="confirm-button" onClick={handlerUpdate}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageConfirm;
