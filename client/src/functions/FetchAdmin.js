import axios from "axios";

export const UpdateAdmin = async (dataMensaje) => {
  try {
    await axios.put(`${process.env.REACT_APP_URL_API}/admin/email`, {dataMensaje});
    console.log(dataMensaje);
  } catch (error) {
    console.log(error);
  }
};
