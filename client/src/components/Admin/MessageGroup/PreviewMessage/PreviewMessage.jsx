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

  const slicedNotifications = notifications.slice(0, 5);

  return (
    <div className="preview-message">
      <p>PreviewMessage</p>
      <button onClick={() => setSection("Message")}>Mensajes</button>

      <div className="email-list">
        <h2>Emails</h2>
        <ul>
          {slicedNotifications && slicedNotifications.length > 0 ? (
            slicedNotifications.map((notification, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {notification.dataMensaje?.user_name}
                <br />
                <strong>Correo:</strong> {notification.dataMensaje?.user_email}
                <br />
                <strong>Teléfono:</strong>{" "}
                {notification.dataMensaje?.user_phone}
                <br />
                <strong>Mensaje:</strong>{" "}
                {notification.dataMensaje?.user_message}
              </li>
            ))
          ) : (
            <p>No hay notificaciones disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PreviewMessage;
