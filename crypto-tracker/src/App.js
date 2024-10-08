import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CryptoCard from "./components/CryptoCard";
import CryptoDetails from "./components/CryptoDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchCryptos();
  }, []);

  const handleAddAlert = (cryptoId, price) => {
    setAlerts((prevAlerts) => ({
      ...prevAlerts,
      [cryptoId]: price,
    }));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cryptos"
          element={cryptos.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              alerts={alerts}
              onAddAlert={handleAddAlert}
            />
          ))}
        />
        <Route path="/crypto/:id" element={<CryptoDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
