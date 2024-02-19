// previously used the moment package here, but that needs
// esModuleInterop to be true in tsconfig.json...big performance hit
// when running the tests
export const formatStayDate = (dateString: string): string | undefined => {
  if (!dateString) return undefined;

  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);

  return formattedDate;
};
