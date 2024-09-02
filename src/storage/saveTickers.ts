const saveTickers = (tickers: string[]) => {
  localStorage.setItem("tickers", tickers.join(","));
};

export default saveTickers;
