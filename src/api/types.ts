export interface CandlesRawData {
  candles: {
    data: [number, number, number, number, number, number, Date, Date][];
  };
}

export interface TickersRawData {
  securities: {
    data: [
      string,
      string,
      string,
      number,
      number,
      number,
      string,
      string,
      number,
      string
    ][];
  };
}
