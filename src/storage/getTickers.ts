const defaultTickers = ["SBER", "MOEX", "MGNT"];

const getTickers = () => {
  const tickers = localStorage.getItem("tickers")?.split(",");

  if (!tickers) localStorage.setItem("tickers", defaultTickers.join(","));

  return tickers || defaultTickers;
};

export default getTickers;
