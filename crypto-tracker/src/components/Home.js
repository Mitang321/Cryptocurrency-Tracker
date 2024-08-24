import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Cryptocurrency Traker</h1>
        <p className="hero-description">
          Track and manage your cryptocurrency investments with ease.
        </p>
        <Link to="/cryptos" className="explore-button">
          Explore Cryptocurrencies
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
