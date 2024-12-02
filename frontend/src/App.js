// import React from "react";
// import Navbar from "./components/Navbar";
// import Summarizer from "./components/Summarizer";
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <Summarizer />
//     </div>
//   );
// }
// export default App;
// import React, { useState } from 'react';
// import TextInput from './components/TextInput';
// import SummaryOutput from './components/SummaryOutput';
// import Summarizer from './components/Summarizer';
// import OCRInput from './components/OCRInput';
// import Home from './components/Home'; // Optional: Import your home page component
// import './App.css';
// import Navbar from './components/Navbar';

// function App() {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');

//   return (
//     <div className="app">
//       <header className="header">
//          <Navbar/>
//       </header>
//       {/* <OCRInput setExtractedText={setText} setSummary={setSummary} /> */}
//       <Home/>
//       {/* <TextInput text={text} setText={setText} onSummarize={() => Summarize logic if needed} /> */}
//       {/* <SummaryOutput summary={summary} /> */}
//       {/* <Summarizer/> */}
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import OCRInput from './components/OCRInput';
// import Summarizer from './components/Summarizer';
// import SummaryOutput from './components/SummaryOutput';
// import './App.css';

// function App() {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');

//   return (
//     <Router>
//       <div className="app">
//         {/* Navbar remains consistent across all routes */}
//         <header className="header">
//           <Navbar />
//         </header>

//         {/* Routes for different components */}
//         <Routes>
//           {/* Home Route */}
//           <Route path="/" element={<Home />} />

//           {/* Route for OCR Input (Image to Text) */}
//           <Route
//             path="/ocr-input"
//             element={<OCRInput setExtractedText={setText} setSummary={setSummary} />}
//           />

//           {/* Route for Text Summarizer */}
//           <Route
//             path="/summarizer"
//             element={<Summarizer text={text} setText={setText} setSummary={setSummary} />}
//           />

//           {/* Route for Summary Output */}
//           <Route
//             path="/summary-output"
//             element={<SummaryOutput summary={summary} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './components/Home';
// import Summarizer from './components/Summarizer';
// import OCRInput from './components/OCRInput';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         {/* Navigation Links */}
//         <nav className="navbar">
//           <Link to="/" className="nav-link">Home</Link>
//           <Link to="/summarizer" className="nav-link">Text Summarizer</Link>
//           <Link to="/ocr-input" className="nav-link">Image to Text</Link>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/summarizer" element={<Summarizer />} />
//           <Route path="/ocr-input" element={<OCRInput />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './components/Home';
// import Summarizer from './components/Summarizer';
// import OCRInput from './components/OCRInput';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         {/* Navigation Links */}
//         <nav className="navbar">
//           <Link to="/Home" className="nav-link">Home</Link>
//           <Link to="/Home/summarizer" className="nav-link">Text Summarizer</Link>
//           <Link to="/Home/ocr-input" className="nav-link">Image to Text</Link>
//         </nav>

//         {/* Routes */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/summarizer" element={<Summarizer />} />
//           <Route path="/ocr-input" element={<OCRInput />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Summarizer from './components/Summarizer';
import OCRInput from './components/OCRInput';
import About from './components/About';
import Navbar from './components/Navbar'; // Optional Navbar if you have it

function App() {
  return (
    <Router>
      <div className="app">
        {/* Optional: Add Navbar here */}
        <Navbar />

        <Routes>
          {/* Define routes for each component */}
          <Route path="/" element={<Navigate to="/home" />} />
           {/* Redirects root to Home */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/text-text" element={<Summarizer />} />
          <Route path="/image-text" element={<OCRInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

