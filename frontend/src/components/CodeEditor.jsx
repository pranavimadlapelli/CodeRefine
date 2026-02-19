import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSuggest = async () => {
    const res = await axios.post("http://localhost:5000/api/suggest", { code });
    setSuggestion(res.data.suggestion);
  };

  return (<>
    <div>
     <button onClick={(e)=>{navigator.clipboard.writeText(code);e.target.innerText="✔️";setTimeout(()=>e.target.innerText="📋",2000);}} style={{position:"absolute",right:"1px",top:"0px",background:"transparent",border:"none",fontSize:"18px",cursor:"pointer"}}>📋</button>
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button onClick={handleSuggest}>Suggest Code</button>
      {suggestion && (
        <div className="bg-gray-800 text-white p-3 mt-3">
          <h3>AI Suggestion:</h3>
          <button onClick={(e)=>{navigator.clipboard.writeText(suggestion);e.target.innerText="✔️";setTimeout(()=>e.target.innerText="📋",2000);}} style={{position:"absolute",right:"10px",top:"0px",background:"transparent",border:"none",fontSize:"18px",cursor:"pointer"}}>📋</button>
        <Editor
        height="60vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={suggestion}/>        
        </div>
      )}
    </div></>
  );
}

export default CodeEditor;
