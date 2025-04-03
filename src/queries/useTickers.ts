import { useQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";

export default function useTickers() {
  return useQuery({
    queryKey: ["tickers"],
    queryFn: getTickers,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => {
      const tickersMap: Map<string, string> = new Map();

      for (const raw of data.securities.data) {
        tickersMap.set(raw[0], raw[9]);
      }

      return Array.from(tickersMap).map(([key, value]) => ({
        ticker: key,
        name: value,
      }));
    },
  });
}
