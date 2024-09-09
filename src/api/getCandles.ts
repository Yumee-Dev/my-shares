import type { Candle } from "typings";

type RawCandle = [number, number, number, number, number, number, Date, Date];

interface RawData {
  candles: {
    data: RawCandle[];
  };
}

interface GetCandlesParams {
  startDate: Date;
  endDate: Date;
  tickers: string[];
}

const getCandles = async (params: GetCandlesParams) => {
  const { startDate, endDate, tickers } = params;

  if (tickers.length === 0) return [];

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const url = (ticker: string) =>
    `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${start}&till=${end}&interval=24`;
  const responses = await Promise.all(
    tickers.map((ticker) => fetch(url(ticker)))
  );
  const jsons: RawData[] = await Promise.all(
    responses.map((response) => response.json())
  );

  return jsons.map((json, index) => {
    const candles: Candle[] = json.candles.data.map((rawCandle) => {
      const [open, close, high, low] = rawCandle;

      return { date: new Date(rawCandle[6]), open, close, high, low };
    });

    return { ticker: tickers[index], candles };
  });
};

export default getCandles;
