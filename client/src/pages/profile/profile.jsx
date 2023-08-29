import React, {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {DecodedToken} from '../../utils/DecodedToken';
import {getUserDetail} from '../../functions/fetchingUsers';
import {fileUpload} from '../../utils/fileUpload';
import {updateProduct} from '../../functions/fetchingProducts';

export const Profile = () => {
  const [profile, SetProfile] = useState ({});
  const [images, setImages] = useState ([]); // buffer de images
  const [imageurls, setImageurls] = useState (null); //array de urls de cloudinary

  useEffect (() => {
    const token = GetDecodedCookie ('cookieToken');
    if (token) {
      let {uid} = DecodedToken (token);
      CallUsersDetail (uid);
    }
  }, []);

  const CallUsersDetail = async uid => {
    const info = await getUserDetail (uid);
    SetProfile (info);
  };

  const handleImageUpload = event => {
    const selectedFiles = event.target.files;
    setImages (prevImages => [...prevImages, ...selectedFiles]);
  };

  const handlerSubmitImage = async () => {
    await fileUpload (images, 'profiles').then (res => {
      setImageurls (res);
      updateProduct (res);
      console.log (res);
    });
  };

  //Maapear profile 

  //las funciones hay que corregirlas por que el componente esta creado en prueba para products/admin
  return (
    <div>
      <input
        type="file"
        name=""
        id=""
        onChange={e => handleImageUpload (e)} //input y button se usarian en el admin 
        multiple
      />
      <button onClick={handlerSubmitImage} disabled={images ? false : true}>
        Subir foto
      </button>

    </div>
  );
};

export default Profile;
