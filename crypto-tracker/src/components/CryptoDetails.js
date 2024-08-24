import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useParams } from "react-router-dom";
import "./CryptoDetails.css";

const CryptoDetails = () => {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState("7");
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeRange}`
        );
        const data = await response.json();
        setHistoricalData(data.prices);
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchCryptoData();
    fetchHistoricalData();
  }, [id, timeRange]);

  if (!cryptoData) return <p>Loading...</p>;

  const chartData = {
    labels: historicalData.map((data) =>
      new Date(data[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${cryptoData.name} Price (USD)`,
        data: historicalData.map((data) => data[1]),
        fill: false,
        backgroundColor: "#007bff",
        borderColor: "#007bff",
      },
    ],
  };

  return (
    <div className="crypto-details">
      <h2>{cryptoData.name} Details</h2>
      <p>Symbol: {cryptoData.symbol.toUpperCase()}</p>
      <p>Current Price: ${cryptoData.market_data.current_price.usd}</p>
      <p>Market Cap: ${cryptoData.market_data.market_cap.usd}</p>
      <p>24h Volume: ${cryptoData.market_data.total_volume.usd}</p>
      <p
        className={
          cryptoData.market_data.price_change_percentage_24h > 0
            ? "positive"
            : ""
        }
      >
        24h Change:{" "}
        {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
      </p>

      <div className="chart-container">
        <h3>Price History</h3>
        <div>
          <label>Select Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1">24 Hours</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="365">1 Year</option>
          </select>
        </div>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoDetails;
