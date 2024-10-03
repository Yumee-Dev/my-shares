import { Col, Row } from "antd";

import TickerCard from "components/TickerCard/TickerCard";
import useCandlesData from "hooks/useCandlesData";
import styles from "./TickerCardsList.module.css";

import type { FC } from "react";

const TickerCardsList: FC = () => {
  const { status, data } = useCandlesData();

  if (status === "loading") return <div>Loading...</div>;

  if (data.length === 0) return <div>No tickers added. Try to add one.</div>;

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        {data.map((tickerData) => (
          <Col key={tickerData.ticker} sm={24} md={12} xl={8}>
            <TickerCard tickerData={tickerData} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TickerCardsList;
