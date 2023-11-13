import axios from "axios";

export const getSales = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL_API}/admin/orders`,
      {
        headers: { "user-token": token },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSalesById = async (id, value, token) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL_API}/admin/orders/${id}`,
      { value },
      {
        headers: { "user-token": token },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSalesTranckingNumber = async (
  id,
  token,
  shippingNumber,
  priceNumberSend
) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL_API}/admin/orders/delivery/${id}`,
      { shippingNumber, priceNumberSend },
      {
        headers: { "user-token": token },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
