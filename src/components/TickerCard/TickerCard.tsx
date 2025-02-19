import { Button, Card, Flex, Spin } from "antd";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTooltip,
  VictoryContainer,
} from "victory";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import useTickersAtom from "atoms/tickersAtom";
import usePeriodAtom from "atoms/periodAtom";
import useCandles from "queries/useCandles";
import getPeriodStart from "utils/getPeriodStart";
import formatDate from "utils/formatDate";

import type { FC } from "react";

type DefaultAnimateLayoutChangesParams = Parameters<
  typeof defaultAnimateLayoutChanges
>[0];

interface TickerCardProps {
  ticker: string;
  dragAndDropDisabled: boolean;
}

// Set up ticker removing animation
// https://github.com/clauderic/dnd-kit/discussions/108#discussioncomment-4305184
function animateLayoutChanges(args: DefaultAnimateLayoutChangesParams) {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

const TickerCard: FC<TickerCardProps> = ({ ticker, dragAndDropDisabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ticker,
      disabled: dragAndDropDisabled,
      animateLayoutChanges,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { remove } = useTickersAtom();
  const [period] = usePeriodAtom();
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
          candleWidth={period === "year" ? 14 : 8}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </Card>
  );
};

export default TickerCard;
