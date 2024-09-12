import { useQueries } from "@tanstack/react-query";
import getCandle from "api/getCandle";

import type { Candle } from "typings";

interface UseCandlesParams {
  startDate: Date;
  endDate: Date;
  tickers: string[];
}

export default function useCandles(params: UseCandlesParams) {
  const { startDate, endDate, tickers } = params;

  return useQueries({
    queries: tickers.map((ticker) => ({
      queryKey: [ticker, startDate.toDateString(), endDate.toDateString()],
      queryFn: () => getCandle({ ticker, startDate, endDate }),
    })),
    combine: (results) => {
      return {
        data: results.map((result, index) => {
          const ticker = tickers[index];
          const rawData = result.data;

          if (!rawData) return { ticker, candles: [] };

          const candles: Candle[] = rawData.candles.data.map((rawCandle) => {
            const [open, close, high, low] = rawCandle;

            return { date: new Date(rawCandle[6]), open, close, high, low };
          });

          return { ticker, candles };
        }),
        success: results.every((result) => result.isSuccess),
      };
    },
  });
}
