import { FC } from "react";
import { Flex, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { VictoryAxis, VictoryCandlestick, VictoryChart } from "victory";
import useTickersStore from "stores/tickersStore";
import styles from "./TickerCard.module.css";

import type { Candle } from "typings";

interface TickerCardProps {
  ticker: string;
  data: Candle[];
}

const TickerCard: FC<TickerCardProps> = ({ ticker, data }) => {
  const { remove } = useTickersStore((state) => state);

  return (
    <li className={styles.card}>
      <Flex component="header" justify="space-between">
        <h3>{ticker}</h3>
        <Button
          shape="circle"
          icon={<CloseCircleOutlined />}
          onClick={() => remove(ticker)}
        />
      </Flex>

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
    </li>
  );
};

export default TickerCard;
