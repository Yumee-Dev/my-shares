import { useEffect } from "react";
import useTickers from "queries/useTickers";
import getTickers from "storage/getTickers";
import useTickersStore from "stores/tickersStore";

import type { FC } from "react";

const Initializer: FC = () => {
  const tickers = useTickers();
  const { add: addTickers, initDictionary } = useTickersStore((state) => state);

  useEffect(() => {
    addTickers(getTickers());
  }, [addTickers]);

  useEffect(() => {
    if (!tickers.data) return;

    initDictionary(tickers.data);
  }, [initDictionary, tickers.data]);

  return null;
};

export default Initializer;
