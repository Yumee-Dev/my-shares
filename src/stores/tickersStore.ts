import { create } from "zustand";

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
      if (typeof ticker === "string" && !state.tickers.includes(ticker))
        return { tickers: [...state.tickers, ticker] };

      if (Array.isArray(ticker))
        return {
          tickers: [
            ...state.tickers,
            ...ticker.filter(
              (currentTicker) => !state.tickers.includes(currentTicker)
            ),
          ],
        };

      return state;
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
