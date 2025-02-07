import { useAtom, atom } from "jotai";

import type { TickerInfo } from "types";

const tickersDictionaryAtom = atom<TickerInfo[]>([]);

const useTickersDictionaryAtom = () => useAtom(tickersDictionaryAtom);

export default useTickersDictionaryAtom;
