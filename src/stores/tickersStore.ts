import { create } from "zustand";
import saveTickers from "storage/saveTickers";

interface TickersState {
  tickers: string[];
  add: (ticker: string | string[]) => void;
  remove: (ticker: string) => void;
  clear: () => void;
}

const useTickersStore = create<TickersState>((set) => ({
  tickers: [],
  add: (ticker) =>
    set((state) => {
      let newTickers = state.tickers;

      if (typeof ticker === "string" && !state.tickers.includes(ticker))
        newTickers = [...state.tickers, ticker];

      if (Array.isArray(ticker))
        newTickers = [
          ...state.tickers,
          ...ticker.filter(
            (currentTicker) => !state.tickers.includes(currentTicker)
          ),
        ];

      saveTickers(newTickers);

      return { tickers: newTickers };
    }),
  remove: (ticker) =>
    set((state) => {
      const newTickers = state.tickers.filter(
        (currentTicker) => currentTicker !== ticker
      );

      saveTickers(newTickers);

      return { tickers: newTickers };
    }),
  clear: () =>
    set(() => {
      saveTickers([]);

      return { tickers: [] };
    }),
}));

export default useTickersStore;
