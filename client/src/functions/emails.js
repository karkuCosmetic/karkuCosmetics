import axios from "axios";

export const getEmails = async () => {
  try {
    const emails = await axios.get("http://localhost:3001/admin/email");
    return emails;
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
