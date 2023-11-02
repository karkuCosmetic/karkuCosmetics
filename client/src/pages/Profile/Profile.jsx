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
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import PurchaseHistoryItem from "../../components/PurchaseHistoryItem/purchaseHistoryItem";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({
    name: profile.name ? profile.name : "Nombre",
    lastName: profile.lastName ? profile.lastName : "Apellido",
    phone: profile.phone ? profile.phone : "Telefono",
    image: profile.image ? profile.image : "",
  });
  const [dataUpdateAdress, setDataUpdateAdress] = useState(profile.adress);
  const [trackNumberCopied, setTrackNumberCopied] = useState(false);

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 10;

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
    const info = await getUserDetail(uid, token);
    setProfile(info);
    setDataUpdate({
      name: info.name,
      lastName: info.lastName,
      phone: info.phone,
      image: info.image,
    });
    setDataUpdateAdress(info.adress);
  };

  const handleChange = (event) => {
    console.log(event.target.name);
    const property = event.target.name;
    const value = event.target.value;
    setDataUpdate({ ...dataUpdate, [property]: value });
  };

  const handleChangeAdress = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDataUpdateAdress({ ...dataUpdateAdress, [property]: value });
  };

  const handleSave = async () => {
    setEditing(false);
    await PutUser(
      profile.uid,
      { data: { dataUpdate, dataUpdateAdress } },
      token
    );
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
    ? profile.buys.reverse().slice(indexOfFirstPurchase, indexOfLastPurchase)
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("currentPage:", pageNumber);
  };

  const handleCopyTrackNumber = () => {
    if (selectedPurchase.detailPay.TrackNumber) {
      const textArea = document.createElement("textarea");
      textArea.value = selectedPurchase.detailPay.TrackNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setTrackNumberCopied(true);
    }
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
                  value={dataUpdate.phone}
                  name="phone"
                  onChange={handleChange}
                />
                <label className="label-edit-profile" htmlFor="callePrincipal">
                  Calle Principal:
                </label>
                <input
                  type="text"
                  placeholder="Calle Principal"
                  value={dataUpdateAdress.callePrincipal}
                  name="callePrincipal"
                  onChange={handleChangeAdress}
                />
                <label className="label-edit-profile" htmlFor="numero">
                  Número:
                </label>
                <input
                  type="text"
                  placeholder="Número"
                  value={dataUpdateAdress.numero}
                  name="numero"
                  onChange={handleChangeAdress}
                />
                <label className="label-edit-profile" htmlFor="piso">
                  Piso:
                </label>
                <input
                  type="text"
                  placeholder="Piso"
                  value={dataUpdateAdress.piso}
                  name="piso"
                  onChange={handleChangeAdress}
                />
                <label className="label-edit-profile" htmlFor="localidad">
                  Localidad:
                </label>
                <input
                  type="text"
                  placeholder="Localidad"
                  value={dataUpdateAdress.localidad}
                  name="localidad"
                  onChange={handleChangeAdress}
                />
                <label className="label-edit-profile" htmlFor="provincia">
                  Provincia:
                </label>
                <input
                  type="text"
                  placeholder="Provincia"
                  value={dataUpdateAdress.provincia}
                  name="provincia"
                  onChange={handleChangeAdress}
                />
              </div>
            ) : (
              <div className="info-user">
                <h2>
                  {profile.name} {profile.lastName}
                </h2>
                <p>
                  Domicilio: {profile.adress?.callePrincipal}{" "}
                  {profile.adress?.numero} {profile.adress?.piso},{" "}
                  {profile.adress?.localidad} - {profile.adress?.provincia}
                </p>

                <p>Teléfono: {profile.phone}</p>
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
            <div className="status-id-purchase">
              Compra N°: {selectedPurchase.id}
              Estado: {selectedPurchase.detailPay.status}
            </div>
            <div className="item-detail">
              <div className="item-detail-container">
                <div className="payment-detail-purchase">
                  <div className="item-info-detail">
                    <p>
                      <strong>Total: </strong>
                      {totalCompra}
                    </p>
                  </div>
                  <div className="item-info-detail">
                    <p>
                      <strong>Fecha: </strong>
                      {formatDateModal(selectedPurchase.methodPay.datePay)}
                    </p>
                  </div>
                  <div className="item-info-detail">
                    <p>
                      <strong>Forma de pago: </strong>
                      {selectedPurchase.methodPay.cardType}
                    </p>
                  </div>

                  <div className="item-info-detail">
                    <p>
                      <strong>Finalizada en: </strong>
                      ***{selectedPurchase.methodPay.last_four_digit}
                    </p>
                  </div>
                </div>
                {selectedPurchase && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close-button"
                        onClick={closePurchaseDetail}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </span>
                      <div className="status-id-purchase">
                        <p>
                          <strong>Compra N°:</strong> {selectedPurchase.id}
                        </p>
                        <p>
                          <strong>Estado:</strong>{" "}
                          {selectedPurchase.detailPay.status}
                        </p>
                        <p>
                          <strong>Envío: </strong>
                          {selectedPurchase.detailPay.TrackNumber ? (
                            <>
                              {selectedPurchase.detailPay.TrackNumber}{" "}
                              <button
                                onClick={handleCopyTrackNumber}
                                className="copy-shipping"
                              >
                                Copiar N°
                              </button>
                            </>
                          ) : (
                            "-"
                          )}
                        </p>
                        <a
                          href="https://www.correoargentino.com.ar/formularios/ondnc"
                          target="_blank"
                          rel="noreferrer"
                          className="follow-shipping"
                        >
                          Seguir envío
                        </a>
                      </div>
                      <div className="item-detail">
                        <div className="item-detail-container">
                          <div className="payment-detail-purchase">
                            <div className="item-info-detail">
                              <p>
                                <strong>Total: $</strong> {totalCompra}
                              </p>
                            </div>
                            <div className="item-info-detail">
                              <p>
                                <strong>Fecha: </strong>
                                {formatDateModal(
                                  selectedPurchase.methodPay.datePay
                                )}
                              </p>
                            </div>
                            <div className="item-info-detail">
                              <p>
                                <strong>Forma de pago: </strong>
                                {selectedPurchase.methodPay.cardType}
                              </p>
                            </div>
                            <div className="item-info-detail">
                              <p>
                                <strong>Finalizada en: </strong>
                                ***{selectedPurchase.methodPay.last_four_digit}
                              </p>
                            </div>
                          </div>
                          <div className="products-full-container">
                            <div className="products-totalPay-detailSale">
                              <div className="detail-product-sale">
                                <div className="product-header">
                                  <strong>Producto/s:</strong>
                                </div>
                                {selectedPurchase.detailPay.items.map(
                                  (item, index) => (
                                    <div className="product" key={index}>
                                      <p>{item.title}</p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="products-totalPay-detailSale">
                              <div className="detail-product-sale">
                                <div className="product-header">
                                  <strong>Cantidad:</strong>
                                </div>
                                {selectedPurchase.detailPay.items.map(
                                  (item, index) => (
                                    <div className="product" key={index}>
                                      <p>x{item.quantity}</p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="products-totalPay-detailSale">
                              <div className="detail-product-sale">
                                <div className="product-header">
                                  <strong>Precio unitario:</strong>
                                </div>
                                {selectedPurchase.detailPay.items.map(
                                  (item, index) => (
                                    <div className="product" key={index}>
                                      <p>$ {item.unit_price}</p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
