import React from "react";
import Login from "../../components/Login/login";
import Register from "../../components/Register/register";
import "./loginPage.css";
import Navbar from "../../components/NavBar/navbar";


const LoginPage = () => {
  return (
    <>
    <Navbar/>
      <div className="login-register-container">
        <Login />
        <Register />
      </div>
    </>
  );
};

export default LoginPage;
