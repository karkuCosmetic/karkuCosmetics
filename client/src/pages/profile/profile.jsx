import React, {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {DecodedToken} from '../../utils/DecodedToken';
import {getUserDetail} from '../../functions/fetchingUsers';
import { fileUpload } from '../../utils/fileUpload';
export const Profile = () => {
  const [profile, SetProfile] = useState ({});
  const [image, setImage] = useState(null);

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

  console.log (profile);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setImage (file);
  };
  const handlerSubmitImage=async ()=>{
   const url=await fileUpload(image,"profiles")//la sube a cloudinary y devuelve la url que debe ser enviada a la base y actualizada 
   console.log(url);
  }

  //Mapear profile
  return (
    <div>
      <input type="file" name="" id="" onChange={e => handleFileChange (e)} />
      <button onClick={handlerSubmitImage } disabled={image ? false : true}>
        Subir foto
      </button>

    </div>
  );
};

export default Profile;
