import React, { useEffect, useState } from "react";
import {
  deleteEmailById,
  getEmails,
  sendEmail,
} from "../../../../functions/emails";
import "./PreviewMessage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const PreviewMessage = ({ setSection }) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    getEmails()
      .then((data) => setNotifications(data.emails.reverse()))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);

  const slicedNotifications = notifications.slice(0, 5);

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  const handleReply = () => {
    if (selectedMessage && replyText.trim() !== "") {
      const replyBody = `Respuesta:\n${selectedMessage.user_message}\n\n\n${replyText}`;

      sendEmail({
        to: selectedMessage.user_email,
        subject: `Re: ${selectedMessage.user_message}`,
        body: replyBody,
        id: selectedMessage.id,
      })
        .then(() => {
          console.log("Mensaje enviado con éxito");

          setReplyText("");
        })
        .catch((error) => {
          console.error("Error al enviar el mensaje:", error);
        });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Confirmar borrado?",
      text: "Esto eliminará el mensaje de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmailById(id)
          .then(() => {
            setNotifications(notifications.filter((email) => email.id !== id));
            Swal.fire(
              "Eliminado",
              "El mensaje ha sido eliminado con éxito",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error al eliminar el mensaje:", error);
          });
      }
    });
  };

  const formatDateModal = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
                    <strong>Fecha: </strong> {formatDateModal(el.date)}
                    <br />
                  </div>
                  <div className="text-message-preview-container">
                    {el.user_message.slice(0, 200)}...
                  </div>
                  <div className="btn-show-message-container">
                    <button
                      className="btn-show-message"
                      onClick={() => openModal(el)}
                    >
                      Ver mensaje
                    </button>
                  </div>
                  <button
                    className="btn-delete-message"
                    onClick={() => handleDelete(el.id)}
                  >
           <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay notificaciones disponibles.</p>
          )}
        </ul>
      </div>
      <div className="btn-showAll-messages-container">
        <button
          className="btn-showAll-messages"
          onClick={() => setSection("Message")}
        >
          Ver Todos
        </button>
      </div>
      {isModalOpen && (
        <div className="overlay-previewMessage">
          <div className="message-modal">
            <div className="close-message-modal-container">
              <span className="close-message-modal" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            {selectedMessage && (
              <div className="message-details">
                <div className="info-message-modal">
                  <div className="name-email">
                    <strong>Nombre:</strong> {selectedMessage.user_name}
                    <br />
                    <strong>Correo:</strong> {selectedMessage.user_email}
                  </div>
                  <div className="phone-date">
                    <strong>Teléfono:</strong> {selectedMessage.user_phone}
                    <br />
                    <strong>Fecha: </strong>
                    {formatDateModal(selectedMessage.date)}
                  </div>
                </div>
                <div className="text-message-modal">
                  <strong>Mensaje:</strong> "{selectedMessage.user_message}"
                </div>
                <textarea
                  className="textarea-response-message"
                  placeholder="Escribir respuesta acá..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="btn-response-message-container">
                  <button
                    className="btn-response-message"
                    onClick={handleReply}
                  >
                    Enviar Respuesta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewMessage;
