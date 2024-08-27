import { FC } from "react";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory";
import { Candle } from "../../App";

interface TickerCardProps {
  data: Candle[];
}

const TickerCard: FC<TickerCardProps> = ({ data }) => {
  return (
    <VictoryChart domainPadding={10}>
      <VictoryAxis
        tickFormat={(t: number) =>
          `${new Date(t).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}`
        }
        style={{ tickLabels: { fontSize: 10, padding: 5 } }}
      />
      <VictoryAxis
        dependentAxis
        style={{ tickLabels: { fontSize: 10, padding: 5 } }}
      />
      <VictoryCandlestick
        data={data}
        x="date"
        candleColors={{ positive: "#7fab0f", negative: "#c9574b" }}
      />
    </VictoryChart>
  );
};

export default TickerCard;
