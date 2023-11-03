import axios from "axios";

export const postlogin = async (values) => {
  try {
    const resp = await axios.post(`${process.env.REACT_APP_URL_API}/login`, values);
    let token = resp.data.token;
    document.cookie =
      encodeURIComponent("cookieToken") + "=" + encodeURIComponent(token);

    return {
      token,
      status: resp.status,
      verify: resp.data.verify,
      rol: resp.data.rol,
    };
  } catch (err) {
    return { error: err.response.data.errors[0].msg };
  }
};

export const postRegister = async (values) => {
  try {
    await axios.post(`${process.env.REACT_APP_URL_API}/register`, values);
    return "Usuario Creado";
  } catch (error) {
    console.log(error);
    return "Usuario ya existente";
  }
};
