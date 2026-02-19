import axios from "axios";
import { useState } from "react";

function FileUpload() {
  const [result, setResult] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    setResult(res.data.refined);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {result && (
        <div>
          <h3>Refined Code:</h3>
     <button onClick={(e)=>{navigator.clipboard.writeText(code);e.target.innerText="✔️";setTimeout(()=>e.target.innerText="📋",2000);}} style={{position:"absolute",right:"100px",top:"0px",background:"transparent",border:"none",fontSize:"18px",cursor:"pointer"}}>📋</button>
          <Editor
        height="60vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={result}/>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
