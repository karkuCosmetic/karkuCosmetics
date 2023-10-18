import axios from "axios";

export const getSales = async (token) => {
    try {
      const res = await axios.get("http://localhost:3001/admin/orders",{
        headers: { "user-token": token },
      });
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

  export const updateSalesById = async (id,value,token) => {
    try {
      const res = await axios.put(`http://localhost:3001/admin/orders/${id}`,{value},{
        headers: { "user-token": token },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  