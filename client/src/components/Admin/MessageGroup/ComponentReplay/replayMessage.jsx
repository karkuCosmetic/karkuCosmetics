import React, { useState } from "react";
import PreviewMessage from "./PreviewMessage";
import MessageManagement from "./MessageManagement";

function App() {
  const [respondido, setRespondido] = useState(false);

  return (
    <div>
      <PreviewMessage respondido={respondido} setRespondido={setRespondido} />
      <MessageManagement respondido={respondido} setRespondido={setRespondido} />
    </div>
  );
}

export default App;
