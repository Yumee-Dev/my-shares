type RawCandle = [number, number, number, number, number, number, Date, Date];

export interface RawData {
  candles: {
    data: RawCandle[];
  };
}
