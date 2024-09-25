import useTickers from "queries/useTickers";

export default function Temp() {
  const tickers = useTickers();

  if (!tickers.data) return null;

  return (
    <ul>
      {tickers.data.map((ticker) => (
        <li>
          {ticker.ticker} {ticker.name}
        </li>
      ))}
    </ul>
  );
}
