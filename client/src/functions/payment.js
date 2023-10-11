import axios from "axios";

export const Payment = async (carrito,token) => {

  try {
    await axios
    .post("http://localhost:3001/payment/create-order", { carrito,token })
    .then((data) => {
      window.location.href = data.data;
      window.localStorage.clear();
      });
  } catch (error) {}
};
