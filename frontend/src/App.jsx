import { useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import "./index.css";

function App() {
  const editorRef = useRef(null);

  const scrollToEditor = () => {
    if (editorRef.current) {
      editorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">CodeRefine</h1>
        <p className="hero-description">
          Transform your code instantly with AI-powered suggestions. Write, refine,
          and optimize code in multiple languages — live and effortlessly.
        </p>
        <button className="cta-button" onClick={scrollToEditor}>
          Start Coding Now
        </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Live AI Suggestions</h3>
          <p>Get instant, real-time code recommendations while you type.</p>
        </div>
        <div className="feature-card">
          <h3>Multi-Language Support</h3>
          <p>Write code in JavaScript, Python, Java, C, C++, TypeScript, and more.</p>
        </div>
        <div className="feature-card">
          <h3>Clipboard Ready</h3>
          <p>Copy your code or AI suggestions with one click.</p>
        </div>
      </section>

      {/* Code Editor Section */}
      <section ref={editorRef} className="editor-section-wrapper">
        <h2 className="editor-section-title">Your AI-Powered Code Editor</h2>
        <CodeEditor />
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 CodeRefine. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
