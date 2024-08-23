import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getCryptoData } from "./services/cryptoService";
import "./App.css";
import CryptoDetails from "./components/CryptoDetails";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [sortOrder, setSortOrder] = useState("market_cap_desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = () => {
      getCryptoData()
        .then((response) => {
          setCryptoData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the data", error);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [sortOrder]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm)
  );

  const sortedCryptoData = [...filteredCryptoData].sort((a, b) => {
    if (sortOrder === "market_cap_desc") {
      return b.market_cap - a.market_cap;
    } else if (sortOrder === "price_desc") {
      return b.current_price - a.current_price;
    }
    return 0;
  });

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Cryptocurrency Tracker</h1>
          <select
            onChange={handleSortChange}
            value={sortOrder}
            className="sort-select"
          >
            <option value="market_cap_desc">Sort by Market Cap (Desc)</option>
            <option value="price_desc">Sort by Price (Desc)</option>
          </select>
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            onChange={handleSearchChange}
            className="search-input"
          />
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div className="crypto-container">
                {sortedCryptoData.map((crypto) => (
                  <div key={crypto.id} className="crypto-card">
                    <a href={`/crypto/${crypto.id}`} className="crypto-link">
                      <h2>{crypto.name}</h2>
                    </a>
                    <p>
                      Current Price: ${crypto.current_price.toLocaleString()}
                    </p>
                    <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
                    <p>24h Volume: ${crypto.total_volume.toLocaleString()}</p>
                    <p
                      className={
                        crypto.price_change_percentage_24h > 0 ? "positive" : ""
                      }
                    >
                      24h Change:{" "}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
