import { create } from "zustand";
import saveTickers from "storage/saveTickers";

interface TickersState {
  tickers: string[];
  add: (ticker: string | string[]) => void;
  delete: (ticker: string) => void;
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
  delete: (ticker) =>
    set((state) => ({
      tickers: state.tickers.filter(
        (currentTicker) => currentTicker !== ticker
      ),
    })),
  clear: () => set({ tickers: [] }),
}));

export default useTickersStore;
