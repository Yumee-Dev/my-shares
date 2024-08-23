import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [candles, setCandles] = useState([]);
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 30,
    today.getHours()
  );

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/SBER/candles.json?from=${
          lastMonth.toISOString().split("T")[0]
        }&till=${today.toISOString().split("T")[0]}&interval=24`
      );
      const dataJson = await data.json();
      setCandles(dataJson.candles.data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{lastMonth.toISOString().split("T")[0]}</p>
        <p>{today.toISOString().split("T")[0]}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          {candles.length > 0 &&
            candles.map(
              (
                candle: [
                  number,
                  number,
                  number,
                  number,
                  number,
                  number,
                  string,
                  string
                ],
                index
              ) => {
                const currentDate = new Date(
                  lastMonth.getFullYear(),
                  lastMonth.getMonth(),
                  lastMonth.getDate() + index,
                  lastMonth.getHours()
                );

                return (
                  <div key={candle[6]}>
                    <span>Date: {currentDate.toISOString().split("T")[0]}</span>
                    <span> Open: {candle[0]}</span>
                    <span> Close: {candle[1]}</span>
                  </div>
                );
              }
            )}
        </div>
      </header>
    </div>
  );
}

export default App;
