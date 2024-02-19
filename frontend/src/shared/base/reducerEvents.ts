export const onCancellation = (actionName: string): string =>
  `${actionName}_CANCEL`;
export const onFailure = (actionName: string): string =>
  `${actionName}_FAILURE`;
export const onLoad = (actionName: string): string => `LOAD_${actionName}`;
export const onSuccessful = (actionName: string): string =>
  `${actionName}_SUCCESS`;
export const onUnload = (actionName: string): string => `UNLOAD_${actionName}`;
