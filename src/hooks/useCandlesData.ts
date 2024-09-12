import { useEffect, useState } from "react";
import getTickers from "storage/getTickers";
import useTickersStore from "stores/tickersStore";
import useCandles from "queries/useCandles";
import { lastMonth, today } from "data";

import type { TickerData } from "typings";

type UseCandlesState = {
  status: "loading" | "idle";
  data: TickerData[];
};

export default function useCandlesData() {
  const [data, setData] = useState<UseCandlesState>({
    status: "idle",
    data: [],
  });
  const { tickers, add: addTickers } = useTickersStore((state) => state);
  const candles = useCandles({ tickers, startDate: lastMonth, endDate: today });

  useEffect(() => {
    addTickers(getTickers());
  }, [addTickers]);

  useEffect(() => {
    if (tickers.length === 0) return;

    setData((prev) => ({ status: "loading", data: prev.data }));

    if (!candles.success) return;

    setData(() => ({
      status: "idle",
      data: candles.data,
    }));
  }, [candles.data, candles.success, tickers.length]);

  return data;
}
