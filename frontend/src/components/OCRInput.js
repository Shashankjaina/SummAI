import React, { useState } from 'react';
import './OCRInput.css'; // Optional: Import your CSS for custom styles

function OCRSummarizer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true); // Start loading

    try {
      // Step 1: Extract text from the image
      const response = await fetch('http://localhost:5000/extract-text', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.extracted_text) {
        setExtractedText(data.extracted_text);

        // Step 2: Send extracted text to the summarization endpoint
        const predictResponse = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: data.extracted_text }),
        });
        const summaryData = await predictResponse.json();
        setSummary(summaryData.summary);
      } else {
        setError('Failed to extract text from the image.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      setError('An error occurred while processing the image.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Clean up summary by removing "<n>"
  const cleanedSummary = summary ? summary.replace(/<n>/g, "") : "Your summary will appear here...";

  return (
    <div className="ocr-summarizer">
      <div className="ocr-input">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Extract and Summarize</button>
      </div>

      {extractedText && (
        <div className="extracted-text">
          <h3>Extracted Text</h3>
          <p>{extractedText}</p>
        </div>
      )}

      <div className="summary-output">
        <h2>Summary</h2>
        {loading ? (
          <div className="spinner"></div> // Show spinner while loading
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p>{cleanedSummary}</p>
        )}
      </div>
    </div>
  );
}

export default OCRSummarizer;
