import React, { useState } from 'react';
import Summarizer from './Summarizer';
import OCRInput from './OCRInput';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [showSummarizer, setShowSummarizer] = useState(false);
  const [showOCRInput, setShowOCRInput] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = () => {
    setShowSummarizer(true);
    setShowOCRInput(false);
    navigate('/text-text');
  };

  const handleOCR = () => {
    setShowOCRInput(true);
    setShowSummarizer(false);
    navigate('/image-text');
  };

  return (
    
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{marginBottom:'50px'}}>
    <img src="SA1.jpg" width="300px" height="300px" alt=""></img>
    </div>
      <button onClick={handleSummarize}>Text to Text</button>
      <button onClick={handleOCR}>Image to Text</button>

      {showSummarizer && <Summarizer />}
      {showOCRInput && <OCRInput />}
    </div>
    // </div>
    
  );
}

export default Home;
