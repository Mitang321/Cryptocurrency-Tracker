import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CryptoCard from "./components/CryptoCard";
import CryptoDetails from "./components/CryptoDetails";

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    const fetchCryptos = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      const data = await response.json();
      setCryptos(data);
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
      <Routes>
        <Route
          path="/"
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
    </Router>
  );
}

export default App;
