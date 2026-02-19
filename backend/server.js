import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyCx3H5GzI3qKSEWh1uIPGPiAPlW38TVrP8");
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });


// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("Gemini Backend Running 🚀");
});


// ---------------- CODE SUGGEST ----------------
app.post("/api/suggest", async (req, res) => {
  try {
    const { code } = req.body;

    const result = await model.generateContent(
      `Complete this code with proper formatting and best practices with comments and proper error handling and send only code:\n${code}`
    );

    const response = result.response.text();

    res.json({ suggestion: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Suggestion failed" });
  }
});


// ---------------- DEBUG ----------------
app.post("/api/debug", async (req, res) => {
  try {
    const { code } = req.body;

    const result = await model.generateContent(
      `Find and fix errors in this code and comments the corrected lines and send only code:\n${code}`
    );

    const response = result.response.text();

    res.json({ fix: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Debug failed" });
  }
});


// ---------------- FILE UPLOAD ----------------
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileContent = req.file.buffer.toString();

    const result = await model.generateContent(
      `Refactor this code with proper formatting and best practices with comments and proper error handling and send only code:\n${fileContent}`
    );

    const response = result.response.text();

    res.json({ refined: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});


app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
