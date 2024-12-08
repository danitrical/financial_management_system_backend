export const convertDateFromTZ = (date: Date) =>
  new Date(date).toISOString().split('T')[0];
