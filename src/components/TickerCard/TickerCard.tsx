import { Button, Card } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTooltip,
  VictoryContainer,
} from "victory";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import useTickersAtom from "atoms/tickersAtom";
import formatDate from "utils/formatDate";

import type { FC } from "react";
import type { TickerData } from "types";

interface TickerCardProps {
  id: string;
  tickerData: TickerData;
  dragAndDropDisabled: boolean;
}

const TickerCard: FC<TickerCardProps> = ({
  id,
  tickerData,
  dragAndDropDisabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: dragAndDropDisabled });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { remove } = useTickersAtom();

  return (
    <Card
      title={tickerData.ticker}
      extra={
        <Button
          shape="circle"
          icon={<CloseCircleOutlined />}
          onClick={() => {
            console.log("click");
            remove(tickerData.ticker);
          }}
        />
      }
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <VictoryChart
        domainPadding={10}
        containerComponent={
          <VictoryContainer
            style={{
              touchAction: "auto",
            }}
          />
        }
      >
        <VictoryAxis
          tickFormat={(t: number) => formatDate(t)}
          style={{ tickLabels: { fontSize: 10, padding: 5 } }}
        />
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 10, padding: 5 } }}
        />
        <VictoryCandlestick
          data={tickerData.candles.map((candle) => ({
            ...candle,
            label: `${formatDate(candle.date)}\n${" "}\nOpen: ${
              candle.open
            }\nClose: ${candle.close}\nHigh: ${candle.high}\nLow: ${
              candle.low
            }`,
          }))}
          labels={() => ""}
          x="date"
          candleColors={{ positive: "#7fab0f", negative: "#c9574b" }}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </Card>
  );
};

export default TickerCard;
