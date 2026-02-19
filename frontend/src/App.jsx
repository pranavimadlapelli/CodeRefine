import CodeEditor from "./components/CodeEditor";
import FileUpload from "./components/FileUpload";
import DebugPanel from "./components/DebugPanel";
import { useState } from "react";

function App() {
  const [code, setCode] = useState("");

  return (
    <div>
      <h1>CodeRefine Editor</h1>
      <CodeEditor code={code} setCode={setCode} />
      <DebugPanel code={code} />
      <FileUpload setCode={setCode} />
    </div>
  );
}

export default App;
