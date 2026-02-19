import Editor from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  const prevCode = useRef("");
  const prevLanguage = useRef("");
  const typingTimeout = useRef(null);

  // Clipboard helper
  const copyToClipboard = (text, buttonRef) => {
    navigator.clipboard.writeText(text);
    buttonRef.innerText = "✔️";
    setTimeout(() => (buttonRef.innerText = "📋"), 2000);
  };

  // Live suggestion effect with debounce
  useEffect(() => {
    // Only request if code or language changed
    if (code === prevCode.current && language === prevLanguage.current) return;

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      if (code.trim() === "") {
        setSuggestion("");
        prevCode.current = "";
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/suggest", {
          code,
          language,
        });

        // Trim whitespace and display only code
        setSuggestion(res.data.suggestion.trim());

        prevCode.current = code;
        prevLanguage.current = language;
      } catch (err) {
        console.error("Suggestion API error:", err);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(typingTimeout.current);
  }, [code, language]);

  return (
    <div className="page">

      {/* Main content */}
      <main className="main-content">
        {/* Language selector */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="language-select" style={{ marginRight: "10px" }}>
            Choose Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="typescript">TypeScript</option>
          </select>
        </div>

        <div className="editor-section">
          {/* Main Code Editor */}
          <div className="editor-wrapper">
            <button
              className="clipboard-btn"
              onClick={(e) => copyToClipboard(code, e.target)}
            >
              📋
            </button>
            <Editor
              height="60vh"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
            />
          </div>

          {/* AI Suggestion Editor */}
          <div className="editor-wrapper">
            <button
              className="clipboard-btn"
              onClick={(e) => copyToClipboard(suggestion, e.target)}
            >
              📋
            </button>
            <Editor
              height="60vh"
              language={language}
              theme="vs-dark"
              value={loading ? "Typing..." : suggestion}
              options={{ readOnly: true }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CodeEditor;
