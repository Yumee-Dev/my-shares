import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getCandles from "api/getCandles";

import type { Candle, Period } from "types";

interface UseCandlesParams {
  startDate: Date;
  endDate: Date;
  period: Period;
  ticker: string;
}

export default function useCandles(
  params: UseCandlesParams
): UseQueryResult<Candle[]> {
  const { startDate, endDate, period, ticker } = params;

  return useQuery({
    queryKey: [
      "candles",
      ticker,
      startDate.toDateString(),
      endDate.toDateString(),
      period,
    ],
    queryFn: () => getCandles({ ticker, startDate, endDate, period }),
    select: (rawData) =>
      // TODO: Add collapsing for weekly

      rawData.candles.data.map((rawCandle) => {
        const [open, close, high, low] = rawCandle;

        return { date: new Date(rawCandle[6]), open, close, high, low };
      }),
    staleTime: 1000 * 60 * 30,
  });
}
