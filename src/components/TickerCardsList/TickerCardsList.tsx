import TickerCard from "components/TickerCard/TickerCard";

import type { FC } from "react";
import type { Candle } from "typings";

interface TickerCardsListProps {
  data: { ticker: string; candles: Candle[] }[];
}

const TickerCardsList: FC<TickerCardsListProps> = ({ data }) => {
  return (
    <ul style={{ display: "flex", listStyleType: "none", gap: 10 }}>
      {data.map((oneTickerData) => (
        <TickerCard
          ticker={oneTickerData.ticker}
          data={oneTickerData.candles}
        />
      ))}
    </ul>
  );
};

export default TickerCardsList;
