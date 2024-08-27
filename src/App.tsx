import { useEffect, useState } from "react";
import TickerCard from "./components/TickerCard/TickerCard";

const today = new Date();

const lastMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 30,
  today.getHours()
);

type RawCandle = [number, number, number, number, number, number, Date, Date];

export type Candle = {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
};

function App() {
  const [data, setData] = useState<Candle[][]>([]);

  useEffect(() => {
    async function fetchData() {
      const ticker1 = "SBER";
      const ticker2 = "MOEX";
      const ticker3 = "MGNT";
      const startDate = lastMonth.toISOString().split("T")[0];
      const endDate = today.toISOString().split("T")[0];
      const apiUrl = (ticker: string) =>
        `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${startDate}&till=${endDate}&interval=24`;
      const data = await Promise.all([
        fetch(apiUrl(ticker1)),
        fetch(apiUrl(ticker2)),
        fetch(apiUrl(ticker3)),
      ]);
      const dataJson = await Promise.all(data.map((d) => d.json()));

      setData(
        dataJson.map((item: { candles: { data: RawCandle[] } }) =>
          item.candles.data.map((rawCandle) => {
            const [open, close, high, low] = rawCandle;

            return { date: new Date(rawCandle[6]), open, close, high, low };
          })
        )
      );
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 && (
        <div style={{ display: "flex" }}>
          {data.map((oneTickerData) => (
            <TickerCard data={oneTickerData} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
