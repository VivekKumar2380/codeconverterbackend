const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Endpoint to handle code conversion
app.post("/convert", async (req, res) => {
  // Extract code and Language from the request body
  const { code, Language } = req.body;

  // Check if code and Language are provided
  if (!code || !Language) {
    return res
      .status(400)
      .json({ error: "Invalid request. Please provide code and language." });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Convert this code to ${Language}: ${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the converted code from the API response and send it as a JSON response
    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    // Handle errors during code conversion
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});

// Endpoint to handle code debugging
app.post("/debug", async (req, res) => {
  // Extract code from the request body
  const { code } = req.body;

  // Check if code is provided
  if (!code) {
    return res
      .status(400)
      .json({ error: "Invalid request. Please provide code and Language." });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Debug this ${code} and provide the right code with proper explanations in points like a professional code debugger.`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the converted code from the API response and send it as a JSON response
    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    // Handle errors during code debugging
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});

// Endpoint to handle code quality-check
app.post("/quality-check", async (req, res) => {
  // Extract code and Language from the request body
  const { code, Language } = req.body;

  // Check if code is provided
  if (!code) {
    return res
      .status(400)
      .json({ error: "Invalid request. Please provide code and Language." });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Check the quality of ${code} and provide feedback in points`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the converted code from the API response and log it
    const convertedCode = response.data.choices[0].text.trim();
    console.log(convertedCode);

    // Send the converted code as a JSON response
    res.json({ convertedCode });
  } catch (error) {
    // Handle errors during code quality-check
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
