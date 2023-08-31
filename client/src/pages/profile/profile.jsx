import React, { useEffect, useState } from "react";
import { GetDecodedCookie } from "../../utils/DecodedCookie";
import { DecodedToken } from "../../utils/DecodedToken";
import { getUserDetail } from "../../functions/fetchingUsers";
import "./profile.css"; // Asegúrate de importar tu archivo de estilos CSS aquí
import Navbar from "../../components/NavBar/navbar";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const token = GetDecodedCookie("cookieToken");
    if (token) {
      let { uid } = DecodedToken(token);
      callUserDetail(uid);
      // Simulando el historial de compras para demostración
      setPurchaseHistory([
        { id: 1, item: "Product A", price: "$10" },
        { id: 2, item: "Product B", price: "$20" },
      ]);
    }
  }, []);

  const callUserDetail = async (uid) => {
    const info = await getUserDetail(uid);
    setProfile(info);
    setNewName(info.name);
    setNewLastName(info.lastName);
    setNewPhone(info.phone);
  };

  const handleSave = () => {
    // Actualizar la información del perfil de la base
    setEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <img src={require("../../assets/Avatares/avatar3.png")} alt="Avatar" />
          {editing ? (
            <div>
           
              <input
                type="text"
                placeholder="Escribe aquí tu nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Escribe aquí tu apellido"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nuevo Número"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
          ) : (
            <div className="info-user">
              <h2>
              {/* este <h2>Pepito Perez</h2> es solo para tener una vista del name */}
                {/* <h2>Pepito Perez</h2> */}
                {profile.name} {profile.lastName}
              </h2>
              <p>Teléfono: {profile.phone}</p>
              <p>E-mail: {profile.email}</p>
            </div>
          )}
          <button onClick={() => setEditing(!editing)}>
            {editing ? "Cancelar" : "Editar"}
          </button>
          {editing && <button onClick={handleSave}>Guardar</button>}
        </div>

        <div className="purchase-history-card">
          <h3>Historial de Compras</h3>
          <ul>
            {purchaseHistory.map((item) => (
              <li key={item.id}>
                {item.item} - {item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
