import React, { useEffect, useState } from "react";
import { getEmails } from "../../../../functions/emails";
import "./PreviewMessage.css";

const PreviewMessage = ({ setSection }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getEmails()
      .then((data) => setNotifications(data.emails))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);
  console.log(notifications);
  return (
    <div className="preview-message">
      <p>PreviewMessage</p>
      <button onClick={() => setSection("Message")}>Mensajes</button>

      <div className="email-list">
        <h2>Emails</h2>
        <ul>
          {
          notifications && notifications.length > 0 ? (
            notifications.map((el, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {el.dataMensaje?.user_name}
                <br />
                <strong>Correo:</strong> {el.dataMensaje?.user_email}
                <br />
                <strong>Teléfono:</strong> {el.dataMensaje?.user_phone}
                <br />
                <strong>Mensaje:</strong>{" "}
                {el.dataMensaje?.user_message}
              </li>
            ))
          ) : (
            <p>No hay notificaciones disponibles.</p>
          )
          }
        </ul>
      </div>
    </div>
  );
};

export default PreviewMessage;
