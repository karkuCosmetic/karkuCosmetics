import {useEffect, useState} from 'react';
import { getEmails } from '../../../../functions/emails';

const PreviewMessage = ({setSection}) => {
  const [emails, setEmails] = useState ([]);

  useEffect (() => {
    getEmails ().then (data => setEmails (data.emails));
  }, []);

  return (
    <div>
      <p>PreviewMessage</p>
      <button onClick={() => setSection ('Message')}>Messages</button>
    </div>
  );
};
export default PreviewMessage;
