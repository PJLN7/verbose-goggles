export const convertDate = (date) => {
  date = date.split('-');
  const [year, month, day] = date;
  return new Date(year, month, day);
};
