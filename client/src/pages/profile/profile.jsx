import React, { useEffect, useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { DecodedToken } from "../../utils/DecodedToken";
import { PutUser, getUserDetail } from "../../functions/fetchingUsers";
import "./profile.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [profile, setProfile] = useState({});

  const [editing, setEditing] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: profile.name ? profile.name : "Nombre",
    lastName: profile.lastName ? profile.lastName : "Apellido",
    cellphone: profile.cellphone ? profile.cellphone : "Telefono",
    image: profile.image ? profile.image : "",
  });

  const [selectedItem, setSelectedItem] = useState(null);

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
      let { value } = DecodedToken(token);
      callUserDetail(value);
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

  const openItemDetail = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetail = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="profile-container">
          <div className="profile-card">
            {editing === false ? (
              <div>
                <img src={profile.image} alt="Avatar" />
              </div>
            ) : (
              <div className="edit-avatar">
                {imageProfile.map((el, index) => (
                  <img
                    key={index}
                    src={el}
                    alt="Avatar"
                    onClick={() => handleChangeImage(el)}
                    className={el === dataUpdate.image ? "selected-avatar" : ""}
                  />
                ))}
              </div>
            )}

            {editing ? (
              <div className="input-edit">
                <input
                  type="text"
                  placeholder="Escribe aquí tu nombre"
                  value={dataUpdate.name}
                  name={"name"}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Escribe aquí tu apellido"
                  value={dataUpdate.lastName}
                  name={"lastName"}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Nuevo Número"
                  value={dataUpdate.cellphone}
                  name={"cellphone"}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="info-user">
                <h2>
                  {profile.name} {profile.lastName}
                </h2>
                <p>Teléfono: {profile.cellphone}</p>
                <p>E-mail: {profile.email}</p>
              </div>
            )}
            <button onClick={() => setEditing(!editing)}>
              {editing ? "Cancelar" : "Editar"}
            </button>
            {editing && <button onClick={handleSave}>Guardar</button>}
          </div>

          <div className="purchase-history-card">
            <h3 className="store-buys-title">Historial de Compras</h3>
          </div>
          <div className="buys-history">
            {profile.buys ? (
              <div>
                {profile.buys.reverse().map((el) =>
                  el.itemsComprados ? (
                    el.itemsComprados.map((item, index) => (
                      <div
                        className="buys-items"
                        key={index}
                        onClick={() => openItemDetail(item)}
                      >
                        <div className="item-title-img" key={index}>
                          <img
                            src={item.picture_url}
                            alt={item.title}
                            className="item-image"
                          />
                          <div className="item-title">{item.title}</div>x
                          {item.quantity}
                        </div>
                        ${item.unit_price}
                        {item.id}
                      </div>
                    ))
                  ) : (
                    <div key={el.id}>
                      <div className="no-items-message">
                        No hay elementos comprados
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              "loading..."
            )}
          </div>
        </div>
      </div>
      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeItemDetail}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
            <div className="item-detail">
              <img
                src={selectedItem.picture_url}
                alt={selectedItem.title}
                className="item-image"
              />
              <div className="item-title">{selectedItem.title}</div>
              <div className="item-info">
                ${selectedItem.unit_price} x {selectedItem.quantity}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
