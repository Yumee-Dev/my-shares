import { useEffect, useState } from "react";
import getCandles from "api/getCandles";
import getTickers from "storage/getTickers";
import useTickersStore from "stores/tickersStore";
import { lastMonth, today } from "data";

import type { Candle } from "typings";

export default function useCandles() {
  const [data, setData] = useState<{ ticker: string; candles: Candle[] }[]>([]);
  const { tickers, add: addTickers } = useTickersStore((state) => state);

  useEffect(() => {
    addTickers(getTickers());
  }, [addTickers]);

  useEffect(() => {
    if (tickers.length === 0) return;

    async function fetchData() {
      const fetchedData = await getCandles({
        startDate: lastMonth,
        endDate: today,
        tickers,
      });

      setData(fetchedData);
    }

    fetchData();
  }, [tickers]);

  return data;
}
