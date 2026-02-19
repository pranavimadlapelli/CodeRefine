import axios from "axios";
import { useState } from "react";

function DebugPanel({ code }) {
  const [fix, setFix] = useState("");

  const handleDebug = async () => {
    const res = await axios.post("http://localhost:5000/api/debug", { code });
    setFix(res.data.fix);
  };

  return (
    <div>
      <button onClick={handleDebug}>Debug Code</button>
      {fix && (
        <div>
          <h3>refined Code:</h3>
     <button onClick={(e)=>{navigator.clipboard.writeText(code);e.target.innerText="✔️";setTimeout(()=>e.target.innerText="📋",2000);}} style={{position:"absolute",right:"100px",top:"0px",background:"transparent",border:"none",fontSize:"18px",cursor:"pointer"}}>📋</button>
        <Editor
        height="60vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={fix}/>
        </div>
      )}
    </div>
  );
}

export default DebugPanel;
