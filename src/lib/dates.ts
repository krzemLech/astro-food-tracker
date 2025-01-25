export const parseDateToDayStart = (date: Date) => {
  return new Date(date.toISOString().split("T")[0]);
};

export const parseDateParts = (date: Date | string) => {
  if (!date) return { weekday: "-", monthday: "-", year: "-" };
  if (typeof date === "string") date = new Date(date);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [weekday, monthday, year] = formattedDate.split(",");
  return { weekday, monthday, year };
};
