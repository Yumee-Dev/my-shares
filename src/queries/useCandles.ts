import { useQuery, UseQueryResult } from "@tanstack/react-query";
import getCandles from "api/getCandles";

import type { Candle, Period } from "types";

interface UseCandlesParams {
  startDate: Date;
  endDate: Date;
  period: Period;
  ticker: string;
}

const COLLAPSED_HOURS = 3;

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
    select: (rawData) => {
      const candles = rawData.candles.data.map((rawCandle) => {
        const [open, close, high, low] = rawCandle;

        return { date: new Date(rawCandle[6]), open, close, high, low };
      });

      if (period !== "week") return candles;

      const result: Candle[] = [];

      for (
        let i = candles.length - 1;
        i >= COLLAPSED_HOURS - 1;
        i -= COLLAPSED_HOURS
      ) {
        const date = candles[i - COLLAPSED_HOURS + 1].date;
        const open = candles[i - COLLAPSED_HOURS + 1].open;
        const close = candles[i].close;
        const high = Math.max(
          ...candles
            .slice(i - COLLAPSED_HOURS + 1, i + 1)
            .map((candle) => candle.high)
        );
        const low = Math.min(
          ...candles
            .slice(i - COLLAPSED_HOURS + 1, i + 1)
            .map((candle) => candle.low)
        );

        result.unshift({ date, open, close, high, low });
      }

      return result;
    },
    staleTime: 1000 * 60 * 30,
  });
}
