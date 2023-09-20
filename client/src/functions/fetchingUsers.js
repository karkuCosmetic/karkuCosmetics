import axios from "axios";

export const getUserDetail = async (uid) => {
  try {
    let response;
    response = await axios.get(`https://karku-cosmetics-4dsy.vercel.app/user/${uid}`);
    if (!response.data) {
      response = await axios.get(`https://karku-cosmetics-4dsy.vercel.app/admin/${uid}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const PutUser = async (uid, value, token) => {
  console.log(uid,value,token);
  try {
    let response;
    response = await axios.put(`https://karku-cosmetics-4dsy.vercel.app/user/${uid}`, value, {
      headers: { "user-token": token },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const ConfirmEmail = async (uid, value) => {
  try {
    let response;
    response = await axios.put(`http://localhost:3001/user/confirmemail/${uid}`, {value});
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const UpdatePassword=async(value)=>{//value puede recibir un email o password
  try {
    await axios.post(`http://localhost:3001/user/updatepassword`,value)
  } catch (error) {
    
  }
}