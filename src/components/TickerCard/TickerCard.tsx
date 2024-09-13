import { FC } from "react";
import { Button, Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory";
import useTickersStore from "stores/tickersStore";

import type { TickerData } from "types";

interface TickerCardProps {
  tickerData: TickerData;
}

const TickerCard: FC<TickerCardProps> = ({ tickerData }) => {
  const { remove } = useTickersStore((state) => state);

  return (
    <Card
      title={tickerData.ticker}
      extra={
        <Button
          shape="circle"
          icon={<CloseCircleOutlined />}
          onClick={() => remove(tickerData.ticker)}
        />
      }
    >
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
          data={tickerData.candles}
          x="date"
          candleColors={{ positive: "#7fab0f", negative: "#c9574b" }}
        />
      </VictoryChart>
    </Card>
  );
};

export default TickerCard;
