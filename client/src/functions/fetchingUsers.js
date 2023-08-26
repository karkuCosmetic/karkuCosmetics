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
