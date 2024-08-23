import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CryptoDetails.css";

function CryptoDetails() {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = () => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          setCryptoDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the data", error);
        });
    };

    fetchCryptoDetails();
  }, [id]);

  if (!cryptoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-details">
      <h2>{cryptoDetails.name}</h2>
      <img src={cryptoDetails.image.large} alt={cryptoDetails.name} />
      <p>Symbol: {cryptoDetails.symbol.toUpperCase()}</p>
      <p>
        Current Price: $
        {cryptoDetails.market_data.current_price.usd.toLocaleString()}
      </p>
      <p>
        Market Cap: ${cryptoDetails.market_data.market_cap.usd.toLocaleString()}
      </p>
      <p>
        Total Volume: $
        {cryptoDetails.market_data.total_volume.usd.toLocaleString()}
      </p>
      <p>
        Description:{" "}
        {cryptoDetails.description.en || "No description available."}
      </p>
      <a
        href={cryptoDetails.links.homepage[0]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Official Website
      </a>
    </div>
  );
}

export default CryptoDetails;
