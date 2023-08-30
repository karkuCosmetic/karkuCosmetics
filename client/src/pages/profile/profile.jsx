import React, {useEffect, useState} from 'react';
import {GetDecodedCookie} from '../../utils/DecodedCookie';
import {DecodedToken} from '../../utils/DecodedToken';
import {getUserDetail} from '../../functions/fetchingUsers';
import {fileUpload} from '../../utils/fileUpload';
import {updateProduct} from '../../functions/fetchingProducts';
import ProductUpload from '../../components/UserAdmin/ProductUpload/productUpload';

export const Profile = () => {
  const [profile, SetProfile] = useState ({});


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

 

  //Maapear profile 


  return (
    <div>
   

    </div>
  );
};

export default Profile;
