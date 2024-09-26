import { useEffect, useRef, useState } from "react";
import useTickersStore from "stores/tickersStore";
import useCandles from "queries/useCandles";
import { lastMonth, today } from "data";

import type { TickerData } from "types";

type UseCandlesState = {
  status: "loading" | "idle";
  data: TickerData[];
};

export default function useCandlesData() {
  const [data, setData] = useState<UseCandlesState>({
    status: "idle",
    data: [],
  });
  const prevTickersLength = useRef(0);
  const { tickers } = useTickersStore((state) => state);
  const candles = useCandles({ tickers, startDate: lastMonth, endDate: today });

  useEffect(() => {
    if (tickers.length !== prevTickersLength.current) {
      setData((prev) => ({ status: "loading", data: prev.data }));
      prevTickersLength.current = tickers.length;
    }
  }, [tickers.length]);

  useEffect(() => {
    if (candles.isSuccess && data.status === "loading") {
      setData(() => ({
        status: "idle",
        data: candles.data,
      }));
    }
  }, [candles.data, candles.isSuccess, data.status]);

  return data;
}
