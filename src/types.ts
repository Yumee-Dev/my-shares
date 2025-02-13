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

export type TickerInfo = {
  ticker: string;
  name: string;
};

export type Period = "week" | "month" | "year";
