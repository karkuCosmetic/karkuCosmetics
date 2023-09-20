import axios from "axios";

export const UpdateAdmin = async (dataMensaje) => {
  try {
    await axios.put("http://localhost:3001/admin/email", {dataMensaje});
    console.log(dataMensaje);
  } catch (error) {
    console.log(error);
  }
};
