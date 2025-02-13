import type { Period } from "types";

export default function getPeriodStart(periodEnd: Date, period: Period) {
  if (period === "week")
    return new Date(
      periodEnd.getFullYear(),
      periodEnd.getMonth(),
      periodEnd.getDate() - 7,
      periodEnd.getHours()
    );

  if (period === "month")
    return new Date(
      periodEnd.getFullYear(),
      periodEnd.getMonth(),
      periodEnd.getDate() - 30,
      periodEnd.getHours()
    );

  return new Date(
    periodEnd.getFullYear(),
    periodEnd.getMonth(),
    periodEnd.getDate() - 365,
    periodEnd.getHours()
  );
}
