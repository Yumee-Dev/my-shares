import { Button, Card, Flex, Spin } from "antd";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
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
import useCandles from "queries/useCandles";
import getPeriodStart from "utils/getPeriodStart";
import formatDate from "utils/formatDate";

import type { FC } from "react";
import type { Period } from "types";

interface TickerCardProps {
  ticker: string;
  dragAndDropDisabled: boolean;
  period: Period;
}

const TickerCard: FC<TickerCardProps> = ({
  ticker,
  dragAndDropDisabled,
  period,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ticker, disabled: dragAndDropDisabled });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { remove } = useTickersAtom();
  const periodEnd = new Date();
  const periodStart = getPeriodStart(periodEnd, period);
  const candles = useCandles({
    ticker,
    startDate: periodStart,
    endDate: periodEnd,
    period,
  });

  if (!candles.isSuccess)
    return (
      <Flex justify="center">
        <Spin indicator={<LoadingOutlined spin />} />
      </Flex>
    );

  return (
    <Card
      title={ticker}
      extra={
        <Button
          shape="circle"
          icon={<CloseCircleOutlined />}
          onClick={() => remove(ticker)}
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
          data={candles.data.map((candle) => ({
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
