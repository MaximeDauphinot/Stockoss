export const formatDate = (date: Date): string => {
  return date.toString().split("T")[0];
};
