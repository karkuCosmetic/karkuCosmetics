import axios from "axios";

export const getSales = async () => {
    try {
      const res = await axios.get("http://localhost:3001/admin/orders");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getSalesById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/admin/orders/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const updateSalesById = async (id,value) => {
    try {
      const res = await axios.put(`http://localhost:3001/admin/orders/${id}`,{value});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  