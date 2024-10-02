export default function formatDate(date: number | Date) {
  return `${(typeof date === "number"
    ? new Date(date)
    : date
  ).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}`;
}
