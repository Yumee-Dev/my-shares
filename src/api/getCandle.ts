import type { RawData } from "api/types";

interface GetCandleParams {
  startDate: Date;
  endDate: Date;
  ticker: string;
}

export default async function getCandle(params: GetCandleParams) {
  console.log("getCandle invocation");

  const { startDate, endDate, ticker } = params;

  console.log([ticker, startDate.toDateString(), endDate.toDateString()]);

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${start}&till=${end}&interval=24`;

  const response = await fetch(url);
  const json: RawData = await response.json();

  return json;
}
