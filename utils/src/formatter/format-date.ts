function formatDate(date: Date | string | number): string {
  if (!(date instanceof Date)) date = new Date(date);

  return date.toLocaleString();
}

export default formatDate;