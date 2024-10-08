import { useQueries } from "@tanstack/react-query";
import getCandles from "api/getCandles";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { Candle } from "types";
import type { CandlesRawData } from "api/types";

interface UseCandlesParams {
  startDate: Date;
  endDate: Date;
  tickers: string[];
}

export default function useCandles(params: UseCandlesParams) {
  const { startDate, endDate, tickers } = params;

  const queries: UseQueryOptions<CandlesRawData>[] = tickers.map((ticker) => ({
    queryKey: [
      "candles",
      ticker,
      startDate.toDateString(),
      endDate.toDateString(),
    ],
    queryFn: () => getCandles({ ticker, startDate, endDate }),
    staleTime: 1000 * 60 * 30,
  }));

  return useQueries({
    queries,
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
        isSuccess: results.every((result) => result.isSuccess),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
}
