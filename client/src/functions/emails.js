import axios from "axios";

export const getEmails = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL_API}/admin/email`, {
      headers: { "user-token": token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmailById = async (id,token) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_URL_API}/admin/email/${id}`,{
      headers: { "user-token": token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL_API}/admin/email`, { data });
    return res.data;
  } catch (error) {}
};
