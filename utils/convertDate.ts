export const converDate = (isoString: string) => {
  const date = new Date(isoString);

  const readableDate = date.toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return readableDate;
};
