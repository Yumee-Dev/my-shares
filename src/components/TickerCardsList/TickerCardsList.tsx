import { Col, Row } from "antd";
import TickerCard from "components/TickerCard/TickerCard";

import type { FC } from "react";
import type { TickerData } from "typings";

interface TickerCardsListProps {
  data: TickerData[];
}

const TickerCardsList: FC<TickerCardsListProps> = ({ data }) => {
  return (
    <Row gutter={[16, 16]}>
      {data.map((tickerData) => (
        <Col sm={24} md={12} xl={8}>
          <TickerCard tickerData={tickerData} />
        </Col>
      ))}
    </Row>
  );
};

export default TickerCardsList;
