import React, { useEffect, useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { DecodedToken } from "../../utils/DecodedToken";
import { PutUser, getUserDetail } from "../../functions/fetchingUsers";
import "./Profile.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import PurchaseHistoryItem from "../../components/PurchaseHistoryItem/purchaseHistoryItem";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: profile.name ? profile.name : "Nombre",
    lastName: profile.lastName ? profile.lastName : "Apellido",
    cellphone: profile.cellphone ? profile.cellphone : "Telefono",
    image: profile.image ? profile.image : "",
  });
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 5;

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
    const info = await getUserDetail(uid,token);
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

  const openPurchaseDetail = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const closePurchaseDetail = () => {
    setSelectedPurchase(null);
  };

  const formatDateModal = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const totalCompra = selectedPurchase
    ? selectedPurchase.detailPay.items.reduce((total, item) => {
        return total + item.quantity * item.unit_price;
      }, 0)
    : 0;

  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = profile.buys
    ? profile.buys.slice(indexOfFirstPurchase, indexOfLastPurchase)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("currentPage:", pageNumber);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="profile-container">
          <div className="profile-card">
            {editing === false ? (
              <div>
                <img src={profile.image} alt="" />
              </div>
            ) : (
              <div className="edit-avatar">
                {imageProfile.map((el, index) => (
                  <img
                    key={index}
                    src={el}
                    alt=""
                    onClick={() => handleChangeImage(el)}
                    className={el === dataUpdate.image ? "selected-avatar" : ""}
                  />
                ))}
              </div>
            )}

            {editing ? (
              <div className="input-edit">
                <label className="label-edit-profile" htmlFor="name">
                  Nombre:
                </label>
                <input
                  type="text"
                  placeholder="Escribe aquí tu nombre"
                  value={dataUpdate.name}
                  name="name"
                  onChange={handleChange}
                />
                <label className="label-edit-profile" htmlFor="lastName">
                  Apellido:
                </label>
                <input
                  type="text"
                  placeholder="Escribe aquí tu apellido"
                  value={dataUpdate.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
                <label className="label-edit-profile" htmlFor="cellphone">
                  Nuevo Número:
                </label>
                <input
                  type="text"
                  placeholder="Nuevo Número"
                  value={dataUpdate.cellphone}
                  name="cellphone"
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="info-user">
                <h2>
                  {profile.name} {profile.lastName}
                </h2>
                <p>Teléfono: {profile.cellphone}</p>
                {profile.email && (
                  <p>
                    E-mail:{" "}
                    {profile.email.length > 20
                      ? profile.email.slice(0, 20) + "..."
                      : profile.email}
                  </p>
                )}
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
            {currentPurchases.length > 0 ? (
              currentPurchases.reverse().map((purchase, index) => (
                <div
                  key={index}
                  className="purchase-history-item"
                  onClick={() => openPurchaseDetail(purchase)}
                >
                  <PurchaseHistoryItem purchase={purchase} />
                </div>
              ))
            ) : (
              <div className="no-purchases">Aún no se realizaron compras.</div>
            )}
          </div>
          <div className="pagination-history">
            <button
              className="arrow-button"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            {profile.buys ? (
              <ul>
                {Array.from({
                  length: Math.ceil(profile.buys.length / purchasesPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`pagination-button ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </ul>
            ) : (
              "loading..."
            )}
            <button
              className="arrow-button"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage >=
                (profile.buys
                  ? Math.ceil(profile.buys.length / purchasesPerPage)
                  : 0)
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
      {selectedPurchase && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closePurchaseDetail}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
            <div className="item-detail">
              {selectedPurchase.detailPay.items.map((item, index) => (
                <div className="item-full" key={index}>
                  <img
                    src={item.picture_url}
                    alt={item.title}
                    className="item-image-detail"
                  />
                  <div className="item-title-detail">{item.title}</div>
                  <div>x{item.quantity}</div>
                  <div>${item.quantity * item.unit_price}</div>
                </div>
              ))}
              <div className="item-detail-container">
                <div className="item-info-detail">Total: ${totalCompra}</div>
                <div>Fecha: {formatDateModal(selectedPurchase.methodPay.datePay)}</div>
                <div>Método de pago: {selectedPurchase.methodPay.cardType}</div>
                <div>Estado de la compra: {selectedPurchase.detailPay.status}</div>
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
