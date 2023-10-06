import {useEffect, useState} from 'react';
import {getEmails} from '../../../../functions/emails';

 const MessageManagement = ({setSection}) => {
  const [emails, setEmails] = useState ([]);

  useEffect (() => {
    getEmails ().then (data => setEmails (data.emails));
  }, []);
 

  return (
    <div>
      <p>MessageManagement</p>
      <button onClick={() => setSection ('Home')}>Home</button>
    </div>
  );
};
 
export default MessageManagement