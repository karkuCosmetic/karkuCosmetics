import axios from "axios";

export const postlogin = async (values) => {
  try {
    const resp = await axios.post("http://localhost:3001/login", values);
    let token = resp.data.token;
    document.cookie =
      encodeURIComponent("cookieToken") + "=" + encodeURIComponent(token);

    return { token, status: resp.status, verify: resp.data.verify };
  } catch (err) {
    console.log(err);
  }
};

export const postRegister = async (values) => {
  try {
    await axios.post("http://localhost:3001/register", values);
    return "Usuario Creado";
  } catch (error) {
    console.log(error);
  }
};
  