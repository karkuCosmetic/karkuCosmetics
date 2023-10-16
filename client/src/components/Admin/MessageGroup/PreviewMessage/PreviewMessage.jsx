import React, { useEffect, useState } from "react";
import { getEmails } from "../../../../functions/emails";
import "./PreviewMessage.css";

const PreviewMessage = ({ setSection }) => {
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);
  useEffect(() => {
    getEmails()
      .then((data) => setNotifications(data.emails))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);

  const slicedNotifications = notifications.slice(0, 5);

  return (
    <div className="preview-message">
      <h2>Mensajes</h2>
      <div className="email-list">
        <ul>
          {slicedNotifications && slicedNotifications.length > 0 ? (
            slicedNotifications.map((el, index) => (
              <li key={index}>
                <div className="message-preview-container">
                  <div className="info-message-preview-container">
                    <strong>Nombre:</strong> {el.user_name}
                    <br />
                    <strong>Correo:</strong> {el.user_email}
                    <br />
                    <strong>Teléfono:</strong> {el.user_phone}
                    <br />
                  </div>
                  <div className="text-message-preview-container">
                    <strong>Mensaje:</strong> {el.user_message}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No hay notificaciones disponibles.</p>
          )}
        </ul>
      </div>
      <button onClick={() => setSection("Message")}>Ver Todos</button>
    </div>
  );
};

export default PreviewMessage;
