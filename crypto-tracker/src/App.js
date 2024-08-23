import React, { useEffect, useState } from "react";
import { getCryptoData } from "./services/cryptoService";
import "./App.css";

function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    getCryptoData()
      .then((response) => {
        setCryptoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptocurrency Tracker</h1>
      </header>
      <div className="crypto-container">
        {cryptoData.map((crypto) => (
          <div key={crypto.id} className="crypto-card">
            <h2>{crypto.name}</h2>
            <p>Current Price: ${crypto.current_price.toLocaleString()}</p>
            <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
            <p
              className={
                crypto.price_change_percentage_24h > 0 ? "positive" : ""
              }
            >
              24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
