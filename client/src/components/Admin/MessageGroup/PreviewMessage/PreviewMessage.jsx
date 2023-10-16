import React, { useEffect, useState } from "react";
import { getEmails } from "../../../../functions/emails";
import "./PreviewMessage.css";

const PreviewMessage = ({ setSection }) => {
  const [notifications, setNotifications] = useState([]);
console.log(notifications)
  useEffect(() => {
    getEmails()
      .then((data) => setNotifications(data.emails))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);

  const slicedNotifications = notifications.slice(0, 5);

  return (
    <div className="preview-message">
      <h2>Emails</h2>

      <div className="email-list">
        <ul>
          {slicedNotifications && slicedNotifications.length > 0 ? (
            slicedNotifications.map((el, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {el.dataMensaje?.user_name}
                <br />
                <strong>Correo:</strong> {el.dataMensaje?.user_email}
                <br />
                <strong>Teléfono:</strong> {el.dataMensaje?.user_phone}
                <br />
                <strong>Mensaje:</strong> {el.dataMensaje?.user_message}
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
