import { useAtom, useSetAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useCallback } from "react";

const tickersAtom = atomWithStorage(
  "tickers",
  ["SBER", "MGNT", "TATN"],
  createJSONStorage(() => localStorage),
  { getOnInit: true }
);

const useTickersAtom = () => {
  const [tickers, setTickers] = useAtom(tickersAtom);

  const add = useCallback(
    (ticker: string | string[]) => {
      if (typeof ticker === "string" && !tickers.includes(ticker))
        setTickers([...tickers, ticker]);

      if (Array.isArray(ticker)) {
        const newTickers = ticker.filter(
          (currentTicker) => !tickers.includes(currentTicker)
        );

        if (newTickers.length > 0) setTickers([...tickers, ...newTickers]);
      }
    },
    [setTickers, tickers]
  );

  const remove = useCallback(
    (ticker: string) => {
      console.log("remove");
      const tickerIndex = tickers.findIndex(
        (currentTicker) => currentTicker === ticker
      );

      if (tickerIndex >= 0)
        setTickers(
          tickers.slice(0, tickerIndex).concat(tickers.slice(tickerIndex + 1))
        );
    },
    [setTickers, tickers]
  );

  const clear = useCallback(() => {
    setTickers([]);
  }, [setTickers]);

  return { tickers, add, remove, clear };
};

export const useSetTickersAtom = () => useSetAtom(tickersAtom);

export default useTickersAtom;
