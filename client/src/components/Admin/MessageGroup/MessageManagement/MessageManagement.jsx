import React, { useEffect, useState } from "react";
import { getEmails } from "../../../../functions/emails";
import "./MessageManagement.css";

const MessageManagement = ({ setSection }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getEmails()
      .then((data) => setEmails(data.emails))
      .catch((error) => console.error("Error fetching emails:", error));
  }, []);

  return (
    <div className="message-management">
      <p>MessageManagement</p>
      <button onClick={() => setSection("Home")}>Inicio</button>

      <div className="email-list">
        <h2>Emails</h2>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageManagement;
