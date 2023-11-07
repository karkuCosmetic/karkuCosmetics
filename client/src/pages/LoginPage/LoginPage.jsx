import React, { useState } from "react";
import Login from "../../components/Login/login";
import Register from "../../components/Register/register";
import "./LoginPage.css";
import Navbar from "../../components/NavBar/navbar";
import { ForgotPassword } from "../../components/ForgotPassword/forgotPassword";
import Footer from "../../components/Footer/footer";

const LoginPage = () => {
  const [formPassword, setFormPassword] = useState(false);

  return (
    <div>
      <Navbar />
      {formPassword === false ? (
        <div className="login-register-container">
          <Login
            formPassword={formPassword}
            setFormPassword={setFormPassword}
          />
          <Register />
        </div>
      ) : (
        <ForgotPassword
          formPassword={formPassword}
          setFormPassword={setFormPassword}
        />
      )}
  <Footer />
    </div>
  );
};

export default LoginPage;
