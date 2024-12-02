import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About This Application</h1>
      <p>
        This application offers two main features to make your summarizing tasks easier: 
        a **Text-to-Text Summary** generator and an **Image-to-Text Summary** tool. 
        Here’s a quick overview of each feature.
      </p>

      <section className="feature-section">
        <h2>Text-to-Text Summary</h2>
        <p>
          The Text-to-Text Summary tool allows users to enter large amounts of text and 
          receive a concise summary. It’s perfect for simplifying articles, reports, 
          and other lengthy documents into digestible content. Just paste your text, 
          and let our tool distill the main points for you.
        </p>
      </section>

      <section className="feature-section">
        <h2>Image-to-Text Summary</h2>
        <p>
          The Image-to-Text Summary feature uses OCR (Optical Character Recognition) to 
          extract text from images. Whether it's a photo of a book page or a document 
          screenshot, you can quickly convert it into text and get a summary. This tool 
          is ideal for summarizing text from non-editable sources.
        </p>
      </section>
    </div>
  );
}

export default About;
