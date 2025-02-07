import { useEffect } from "react";
import useTickers from "queries/useTickers";
import useTickersDictionaryAtom from "atoms/tickersDictionaryAtom";

import type { FC } from "react";

const Initializer: FC = () => {
  const tickers = useTickers();
  const [, setTickersDictionary] = useTickersDictionaryAtom();

  useEffect(() => {
    if (!tickers.data) return;

    setTickersDictionary(tickers.data);
  }, [setTickersDictionary, tickers.data]);

  return null;
};

export default Initializer;
