import { useEffect, useState } from "react";
import { Col, Row } from "antd";
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
import useTickersAtom from "atoms/tickersAtom";
import styles from "./TickerCardsList.module.css";

import type { FC } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Period } from "types";

interface TickerCardsListProps {
  period: Period;
}

const TickerCardsList: FC<TickerCardsListProps> = ({ period }) => {
  const { tickers, setTickers } = useTickersAtom();
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
        const oldIndex = prev.findIndex((ticker) => ticker === active.id);
        const newIndex = prev.findIndex((ticker) => ticker === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    if (matchMedia("(min-width: 1200px)").matches)
      setDragAndDropDisabled(false);
  }, []);

  if (tickers.length === 0) return <div>No tickers added. Try to add one.</div>;

  return (
    <div className={styles.container}>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={tickers}>
          <Row gutter={[16, 16]}>
            {tickers.map((ticker) => (
              <Col key={ticker} sm={24} md={12} xl={8}>
                <TickerCard
                  ticker={ticker}
                  dragAndDropDisabled={dragAndDropDisabled}
                  period={period}
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
