import type { TickersRawData } from "api/types";

export default async function getTickers() {
  const url = `https://iss.moex.com/iss/engines/stock/markets/shares/securities.json`;

  const response = await fetch(url);
  const json: TickersRawData = await response.json();

  return json;
}
