import axios from "axios";

export const getEmails = async (token) => {
  try {
    const res = await axios.get("http://localhost:3001/admin/email", {
      headers: { "user-token": token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmailById = async (id,token) => {
  try {
    const res = await axios.delete(`http://localhost:3001/admin/email/${id}`,{
      headers: { "user-token": token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (data) => {
  try {
    const res = await axios.post(`http://localhost:3001/admin/email`, { data });
    return res.data;
  } catch (error) {}
};
