const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all origins and methods
app.use(cors({
    origin: "*",  // Allow all origins
    methods: ['GET', 'POST', 'OPTIONS'], // Allow POST and OPTIONS methods
    allowedHeaders: ['Content-Type'], // Allow the Content-Type header
}));

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for questions (This can be replaced with a database later)
let questions = [];

// Mock endpoint for handling form submissions
app.post("/submit-question", (req, res) => {
    const { classCode, question } = req.body;

    // Store the question and class code in memory
    questions.push({ classCode, question });

    console.log("Received question submission:");
    console.log("Class Code:", classCode); // This can be removed if you don't want to log it
    console.log("Question:", question); // This will show the question

    // Send a success response back to the frontend
    res.json({
        success: true,
        message: "Question submitted successfully!",
    });
});

// Endpoint to fetch all submitted questions for the teacher
app.get("/get-questions", (req, res) => {
    res.json(questions); // Send all questions to the teacher
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
