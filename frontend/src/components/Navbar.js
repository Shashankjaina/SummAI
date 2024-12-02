import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="brand.jpg" width="100px" height="100px" alt="Brand Logo" />
        <div>
          SummarizeAI
        </div>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};
export default Navbar;
