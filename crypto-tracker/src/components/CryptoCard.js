import React from "react";
import { Link } from "react-router-dom";
import "./CryptoCard.css";

function CryptoCard({ crypto, onAddAlert }) {
  return (
    <div className="crypto-card">
      <h2>{crypto.name}</h2>
      <p>Symbol: {crypto.symbol.toUpperCase()}</p>
      <p>Current Price: ${crypto.current_price.toLocaleString()}</p>
      <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
      <p>24h Volume: ${crypto.total_volume.toLocaleString()}</p>
      <p className={crypto.price_change_percentage_24h > 0 ? "positive" : ""}>
        24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
      </p>
      <Link to={`/crypto/${crypto.id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
}

export default CryptoCard;
