import { useAtom, atom } from "jotai";

import type { Period } from "types";

const periodAtom = atom<Period>("month");

const usePeriodAtom = () => useAtom(periodAtom);

export default usePeriodAtom;
