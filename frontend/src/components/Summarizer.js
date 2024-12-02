import React, { useState } from "react";
import axios from "axios";
import "./Summarizer.css";

const Summarizer = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for better UX
  const [error, setError] = useState(null); // Error state to handle API errors
  const [mode, setMode] = useState("Paragraph"); // Mode state for Paragraph or Bullet Points

  const handleSummarize = async () => {
    if (!text) {
      setSummary("Please enter some text to summarize.");
      return;
    }
    setLoading(true);
    setError(null);
    setSummary("");
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        text: text,
      });
      // Remove <n> symbols from the summary text
      const cleanedSummary = response.data.summary.replace(/<n>/g, " ");
      setSummary(cleanedSummary);
    } catch (err) {
      setError("Failed to summarize the text. Please try again.");
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const formatSummary = (text) => {
    if (mode === "Bullet Points") {
      // Split the text into sentences and format each as a bullet point
      const sentences = text.split('. ').filter(sentence => sentence.trim() !== '');
      return sentences.map(sentence => `• ${sentence.trim()}`).join('\n');
    } else {
      return text; // Return text as a paragraph for paragraph mode
    }
  };

  return (
    <div className="summarizer-container">
      <h2>Text Summarizer</h2>
      <div className="summarizer-options">
        <label>Modes:</label>
        <button
          className={`mode-button ${mode === "Paragraph" ? "active" : ""}`}
          onClick={() => handleModeChange("Paragraph")}
        >
          Paragraph
        </button>
        <button
          className={`mode-button ${mode === "Bullet Points" ? "active" : ""}`}
          onClick={() => handleModeChange("Bullet Points")}
        >
          Bullet Points
        </button>
      </div>
      <div className="input-container">
        <textarea
          placeholder="Enter or paste your text here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="summarize-button" onClick={handleSummarize}>
          Summarize
        </button>
      </div>
      <div className="summary-output">
        <h3>Summary:</h3>
        {loading ? (
          <div className="spinner"></div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <pre style={{ whiteSpace: 'pre-line' }}>{formatSummary(summary)}</pre>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
