import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import TickerCard from "components/TickerCard/TickerCard";
import useTickersAtom from "atoms/tickersAtom";
import styles from "./TickerCardsList.module.css";

import type { FC } from "react";
import type { DragEndEvent } from "@dnd-kit/core";

const dragAndDropMediaQuery = "(min-width: 1200px)";

// Set up ticker removing animation
// https://github.com/clauderic/dnd-kit/discussions/108#discussioncomment-524987
const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const TickerCardsList: FC = () => {
  const { tickers, setTickers } = useTickersAtom();
  const [dragAndDropDisabled, setDragAndDropDisabled] = useState(
    !matchMedia(dragAndDropMediaQuery).matches,
  );

  // Configure sensors not to intercept clicking on remove ticker button
  // https://github.com/clauderic/dnd-kit/issues/591#issuecomment-1873964687
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
    const handleChangeMatchMedia = (event: MediaQueryListEvent) => {
      if (event.matches) setDragAndDropDisabled(false);
      else setDragAndDropDisabled(true);
    };

    matchMedia(dragAndDropMediaQuery).addEventListener(
      "change",
      handleChangeMatchMedia,
    );

    return () =>
      matchMedia(dragAndDropMediaQuery).removeEventListener(
        "change",
        handleChangeMatchMedia,
      );
  }, []);

  if (tickers.length === 0) return <div>No tickers added. Try to add one.</div>;

  return (
    <div className={styles.container}>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        measuring={measuringConfig}
      >
        <SortableContext items={tickers}>
          <Row gutter={[16, 16]}>
            {tickers.map((ticker) => (
              <Col key={ticker} sm={24} md={12} xl={8}>
                <TickerCard
                  ticker={ticker}
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
