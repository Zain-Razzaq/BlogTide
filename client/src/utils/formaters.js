export const getDateInFormat = (date) => {
  const inputDate = new Date(date);

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = inputDate.getUTCDate();
  const month = monthNames[inputDate.getUTCMonth()];
  const year = inputDate.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};
