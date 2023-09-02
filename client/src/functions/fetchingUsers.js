import axios from "axios";

export const getUserDetail = async (uid) => {
  try {
    let response;
    response = await axios.get(`http://localhost:3001/user/${uid}`);
    if (!response.data) {
      response = await axios.get(`http://localhost:3001/admin/${uid}`);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const PutUser = async (uid,value,token) => {

  try {
    let response;
    response = await axios.put(`http://localhost:3001/user/${uid}`,value,{
      headers: { 'user-token': token },
  });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
