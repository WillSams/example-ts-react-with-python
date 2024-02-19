// previously used the numeral package here, but that needs
// esModuleInterop to be true in tsconfig.json...big performance hit
// when running the tests
export const formatNumberAsMoney = (amount?: number): string | undefined => {
  if (amount === undefined) return undefined;

  const formattedAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return `$${formattedAmount}`;
};
