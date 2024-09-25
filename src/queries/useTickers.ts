import { useQuery } from "@tanstack/react-query";
import getTickers from "api/getTickers";

export default function useTickers() {
  return useQuery({
    queryKey: ["tickers"],
    queryFn: getTickers,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) =>
      data.securities.data.map((raw) => ({ ticker: raw[0], name: raw[9] })),
  });
}
