import React, { useEffect, useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { DecodedToken } from "../../utils/DecodedToken";
import { PutUser, getUserDetail } from "../../functions/fetchingUsers";
import "./pageconfirm.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

const PageConfirm = () => {
  const [profile, setProfile] = useState({});

  const [editing, setEditing] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: profile.name ? profile.name : "Nombre",
    lastName: profile.lastName ? profile.lastName : "Apellido",
    cellphone: profile.cellphone ? profile.cellphone : "Telefono",
    image: profile.image ? profile.image : "",
  });

  const imageProfile = [
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836416/karku/profiles/avatar5_pfvu9n.png",
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836416/karku/profiles/avatar6_ioqgvv.png",
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836415/karku/profiles/avatar4_hjrsnt.png",
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836415/karku/profiles/avatar3_g0byoz.png",
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836415/karku/profiles/avatar2_a98x23.png",
    "https://res.cloudinary.com/dqai9sgfs/image/upload/v1693836415/karku/profiles/avatar1_ybwzmn.png",
  ];

  const token = GetDecodedCookie("cookieToken");
  useEffect(() => {
    if (token) {
      let { uid } = DecodedToken(token);
      callUserDetail(uid);
    }
  }, [token]);

  const callUserDetail = async (uid) => {
    const info = await getUserDetail(uid);
    setProfile(info);
    setDataUpdate({
      name: info.name,
      lastName: info.lastName,
      cellphone: info.cellphone,
      image: info.image,
    });
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDataUpdate({ ...dataUpdate, [property]: value });
  };

  const handleSave = () => {
    setEditing(false);
    PutUser(profile.uid, dataUpdate, token);
    window.location.reload();
  };
  const handleChangeImage = (el) => {
    setDataUpdate({ ...dataUpdate, image: el });
  };
  console.log(profile);
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
