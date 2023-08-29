import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';


export const Contact = () => {
  const form = useRef ();
  const sendEmail = e => {
    e.preventDefault ();
    
    emailjs
    .sendForm (
      // process.env.SERVICE_ID,
      // process.env.TEMPLATE_ID,
      // form.current,
      // process.env.PUBLIC_KEY
      "service_s836qxd",
      "template_wqs3znu",
      form.current,
      "-0s9Tt65BXxLivqvY"
      )
      .then (
        result => {
          console.log (result.text);
        },
        error => {
          console.log (error.text);
        }
        );
      };
     
      return (
        <div>

      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>

    </div>
  );
};
