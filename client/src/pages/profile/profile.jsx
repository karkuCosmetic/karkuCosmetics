import React, {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {DecodedToken} from '../../utils/DecodedToken';
import {PutUser, getUserDetail} from '../../functions/fetchingUsers';
import './profile.css'; // Asegúrate de importar tu archivo de estilos CSS aquí
import Navbar from '../../components/NavBar/navbar';

const Profile = () => {
  const [profile, setProfile] = useState ({});
  const [purchaseHistory, setPurchaseHistory] = useState ([]);
  const [editing, setEditing] = useState (false);
  const [dataUpdate, setDataUpdate] = useState ({
    name: profile.name ? profile.name : 'Nombre',
    lastName: profile.lastName ? profile.lastName : 'Apellido',
    cellphone: profile.cellphone ? profile.cellphone : 'Telefono',
    image: profile.image ? profile.image : '',
  });

  const imageProfile = [
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432924/karku/profiles/avatar6_vztlfi.png',
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432921/karku/profiles/avatar5_gmf7iu.png',
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432924/karku/profiles/avatar4_itugxc.png',
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432923/karku/profiles/avatar3_olllxo.png',
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432919/karku/profiles/avatar2_evlgeb.png',
    'https://res.cloudinary.com/dqai9sgfs/image/upload/v1693432920/karku/profiles/avatar1_jan4cn.png',
  ];

  const token = GetDecodedCookie ('cookieToken');
  useEffect (() => {
    if (token) {
      let {uid} = DecodedToken (token);
      callUserDetail (uid);
      // Simulando el historial de compras para demostración
      setPurchaseHistory ([
        {id: 1, item: 'Product A', price: '$10'},
        {id: 2, item: 'Product B', price: '$20'},
      ]);
    }
  }, []);

  const callUserDetail = async uid => {
    const info = await getUserDetail (uid);
    setProfile (info);
    setDataUpdate ({
      name: info.name,
      lastName: info.lastName,
      cellphone: info.cellphone,
      image:info.image
    });
  };

  const handleChange = event => {
    const property = event.target.name;
    const value = event.target.value;
    setDataUpdate ({...dataUpdate, [property]: value});
  };

  const handleSave = () => {
    setEditing (false);
    PutUser (profile.uid, dataUpdate, token);
    window.location.reload ();
  };
  const handleChangeImage = el => {
    setDataUpdate({...dataUpdate, image:el})
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          {editing === false
            ? <img src={profile.image} alt="Avatar" />
            : imageProfile.map ((el,index) => (
                <img
                key={index}
                  src={el}
                  alt="Avatar"
                  onClick={() => handleChangeImage (el)}
                />
              ))}
          {editing
            ? <div>
                <input
                  type="text"
                  placeholder="Escribe aquí tu nombre"
                  value={dataUpdate.name}
                  name={'name'}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Escribe aquí tu apellido"
                  value={dataUpdate.lastName}
                  name={'lastName'}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Nuevo Número"
                  value={dataUpdate.cellphone}
                  name={'cellphone'}
                  onChange={handleChange}
                />
              </div>
            : <div className="info-user">
                <h2>

                  {profile.name} {profile.lastName}
                </h2>
                <p>Teléfono: {profile.cellphone}</p>
                <p>E-mail: {profile.email}</p>
              </div>}
          <button onClick={() => setEditing (!editing)}>
            {editing ? 'Cancelar' : 'Editar'}
          </button>
          {editing && <button onClick={handleSave}>Guardar</button>}
        </div>

        <div className="purchase-history-card">
          <h3>Historial de Compras</h3>
          <ul>
            {purchaseHistory.map (item => (
              <li key={item.id}>
                {item.item} - {item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
