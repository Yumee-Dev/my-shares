const defaultTickers = ["SBER", "MOEX", "MGNT"];

const getTickers = () => {
  const tickers = localStorage.getItem("tickers")?.split(",");

  if (!tickers) {
    localStorage.setItem("tickers", defaultTickers.join(","));

    return defaultTickers;
  }

  if (tickers[0] === "") return [];

  return tickers;
};

export default getTickers;
