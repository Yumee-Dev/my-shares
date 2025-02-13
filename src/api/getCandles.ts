import type { CandlesRawData } from "api/types";
import type { Period } from "types";

interface GetCandlesParams {
  startDate: Date;
  endDate: Date;
  period: Period;
  ticker: string;
}

export default async function getCandles(params: GetCandlesParams) {
  const { startDate, endDate, period, ticker } = params;

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const interval = { week: 60, month: 24, year: 31 }[period];
  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}/candles.json?from=${start}&till=${end}&interval=${interval}`;

  const response = await fetch(url);
  const json: CandlesRawData = await response.json();

  return json;
}
