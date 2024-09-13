export type Candle = {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
};

export type TickerData = {
  ticker: string;
  candles: Candle[];
};
