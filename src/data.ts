export const today = new Date();

export const lastMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 30,
  today.getHours()
);
