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
const genAI = new GoogleGenerativeAI("AIzaSyDutv9ALDOhVOA6jRVMexk4H5z8icIKdcg");
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });


// ---------------- ROOT ----------------
app.get("/", (req, res) => {
  res.send("Gemini Backend Running 🚀");
});


// ---------------- CODE SUGGEST ----------------
app.post("/api/suggest", async (req, res) => {
  try {
     const { code, language } = req.body;
    const result = await model.generateContent(
      `Complete this code in ${language} without errors and comments:\n${code}`
    );

    const response = result.response.text();

    res.json({ suggestion: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Suggestion failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
