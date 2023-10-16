import axios from "axios";

export const getEmails = async () => {
  try {
    const res = await axios.get("http://localhost:3001/admin/email");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEmailsById = async (id) => {
  try {
    const emails = await axios.get(`http://localhost:3001/admin/email/${id}`);
    return emails;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmailById = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/admin/email/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail=async (data)=>{
try {
  const res= await axios.post(`http://localhost:3001/admin/email`,{data});
  return res.data
} catch (error) {
  
}

}
