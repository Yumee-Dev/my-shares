import type { CandlesRawData } from "api/types";

interface GetCandlesParams {
  startDate: Date;
  endDate: Date;
  ticker: string;
}

export default async function getCandles(params: GetCandlesParams) {
  const { startDate, endDate, ticker } = params;

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${start}&till=${end}&interval=24`;

  const response = await fetch(url);
  const json: CandlesRawData = await response.json();

  return json;
}
