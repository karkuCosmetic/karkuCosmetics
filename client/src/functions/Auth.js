import axios from "axios";

export const postlogin = async (values) => {
  try {
    const resp = await axios.post(
      "https://karku-cosmetics-4dsy.vercel.app/login",
      values
    );

    let token = resp.data.token;
    document.cookie =
      encodeURIComponent("cookieToken") + "=" + encodeURIComponent(token);
    // localStorage.setItem("token", token);
    return { token, status: resp.status, session: true };
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
