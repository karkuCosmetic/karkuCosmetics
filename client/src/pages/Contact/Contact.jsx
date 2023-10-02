import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UpdateAdmin } from "../../functions/FetchAdmin";
import "./Contact.css";
import Navbar from "../../components/NavBar/navbar";
import Footer from "../../components/Footer/footer";

export const Contact = () => {
  const [dataMensaje, setDataMensaje] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_message: "Mensaje",
  });

  const form = useRef();
  const MySwal = withReactContent(Swal);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          MySwal.fire({
            icon: "success",
            title: "Mensaje enviado. Te responderemos a la brevedad.",
            iconColor: "#7b60c8",
            confirmButtonColor: "#7b60c8",
            customClass: {
              title: "swal-title-contact",
            },
          });

          setDataMensaje({
            user_name: "",
            user_email: "",
            user_phone: "",
            user_message: "",
          });
        },
        (error) => {
          console.log(error.text);
          MySwal.fire({
            title: "Error al enviar el mensaje",
            icon: "error",
            text: error.text,
            confirmButtonColor: "#FF0000",
          });
        }
      );

    UpdateAdmin(dataMensaje);
  };

  const handleKeyPress = (event) => {
    const validCharacters = /^[0-9]*$/;
    if (!validCharacters.test(event.key)) {
      event.preventDefault();
    }
  };

  const handlerChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "user_name") {
      value = value.replace(/[^A-Za-z]/g, "");
    }
    if (property === "user_phone") {
      value = value.replace(/[^0-9]/g, "");
    }

    setDataMensaje({ ...dataMensaje, [property]: value });
  };

  const MAX_MESSAGE_LENGTH = 140; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <p>
          Si tenés alguna consulta o si necesitas hacer un pedido por mayor,
          envianos tu mensaje y te responderemos al a brevedad.
        </p>

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <label>Nombre</label>
          <input
            className="input-contact"
            type="text"
            name="user_name"
            onChange={handlerChange}
            placeholder="Nombre"
            required
          />
          <label>Email</label>
          <input
            className="input-contact"
            type="email"
            name="user_email"
            onChange={handlerChange}
            placeholder="Email"
            required
          />
          <label>Número</label>
          <input
            className="input-contact-phone"
            type="number"
            name="user_phone"
            onChange={handlerChange}
            onKeyPress={handleKeyPress}
            placeholder="Numero telefonico"
            required
          />
          <label>Mensaje</label>
          <textarea
            name="user_message"
            onChange={handlerChange}
            placeholder="Máximo 140 carácteres."
            maxLength={MAX_MESSAGE_LENGTH}
            required
          />
          <input type="submit" value="Enviar" />
        </form>
      </div>

      <Footer />
    </>
  );
};
