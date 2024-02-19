export const capitalizeFirstLetter = (string?: string): string | undefined => {
  if (!string) return undefined;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
