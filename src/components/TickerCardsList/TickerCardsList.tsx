import { useEffect, useState } from "react";
import { Col, Row, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import TickerCard from "components/TickerCard/TickerCard";
import { useSetTickersAtom } from "atoms/tickersAtom";
import useCandlesData from "hooks/useCandlesData";
import styles from "./TickerCardsList.module.css";

import type { FC } from "react";
import type { DragEndEvent } from "@dnd-kit/core";

const TickerCardsList: FC = () => {
  const setTickersAtom = useSetTickersAtom();
  const { status, data } = useCandlesData();
  const [tickers, setTickers] = useState(
    data.map((tickerData) => ({
      ...tickerData,
      id: tickerData.ticker,
    }))
  );
  const [dragAndDropDisabled, setDragAndDropDisabled] = useState(true);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor, pointerSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTickers((prev) => {
        const oldIndex = prev.findIndex((ticker) => ticker.id === active.id);
        const newIndex = prev.findIndex((ticker) => ticker.id === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    if (tickers.length === 0) return;

    setTickersAtom(tickers.map((ticker) => ticker.ticker));
  }, [setTickersAtom, tickers]);

  useEffect(() => {
    setTickers(
      data.map((tickerData) => ({
        ...tickerData,
        id: tickerData.ticker,
      }))
    );
  }, [data]);

  useEffect(() => {
    if (matchMedia("(min-width: 1200px)").matches)
      setDragAndDropDisabled(false);
  }, []);

  if (status === "loading")
    return (
      <Flex justify="center">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Flex>
    );

  if (data.length === 0) return <div>No tickers added. Try to add one.</div>;

  return (
    <div className={styles.container}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={tickers}>
          <Row gutter={[16, 16]}>
            {tickers.map((ticker) => (
              <Col key={ticker.ticker} sm={24} md={12} xl={8}>
                <TickerCard
                  id={ticker.ticker}
                  tickerData={ticker}
                  dragAndDropDisabled={dragAndDropDisabled}
                />
              </Col>
            ))}
          </Row>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TickerCardsList;
