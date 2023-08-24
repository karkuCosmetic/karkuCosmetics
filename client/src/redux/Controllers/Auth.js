import axios from "axios";
// import { setCookie, deleteCookie } from "cookies-next";
// import { getUser } from "./user";
import { SetAuth } from "../slices/AuthSlice";

export const postlogin = (values) => async (dispatch) => {
  try {
    const resp = await axios.post("http://localhost:3001/login", values);
    let token = resp.data.token;
    // setCookie("cookieToken", token);
    localStorage.setItem("token", token);

    dispatch(SetAuth({ token: token, status: resp.status, session: true }));
  } catch (err) {
    console.log(err);
  }
};

export const postRegister = (values) => async (dispatch) => {
  try {
    await axios.post("http://localhost:3001/register", values);
  } catch (error) {
    console.log(error);
  }
};

// export const clearSession = () => async (dispatch) => {
//   try {
//     dispatch(ClearAuth());
//   } catch (error) {
//     console.log(error);
//   }
// };
